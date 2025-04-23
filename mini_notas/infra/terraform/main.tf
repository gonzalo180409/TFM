terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "eu-west-3"
}

# 📡 Obtener la VPC por defecto
data "aws_vpc" "default" {
  default = true
}

# 🔒 Security Group con puertos abiertos
resource "aws_security_group" "mininotas_sg" {
  name        = "mininotas-sg"
  description = "Permitir SSH, HTTP y HTTPS"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Todo hacia fuera"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 🖥 Instancia EC2 (Ubuntu Free Tier) usando clave ya existente
resource "aws_instance" "mininotas_ec2" {
  ami                    = "ami-0160e8d70ebc43ee1" # Ubuntu 22.04 LTS (Free Tier) en eu-west-3
  instance_type          = "t2.micro"
  key_name               = "mininotas-key"         # ⚠️ Usa tu clave ya existente en AWS
  vpc_security_group_ids = [aws_security_group.mininotas_sg.id]
  user_data = <<-EOF
              #!/bin/bash
              apt update
              apt install -y docker.io docker-compose git
              usermod -aG docker ubuntu
              su - ubuntu <<INNER
              cd ~
              git clone https://github.com/gonzalo180409/TFM.git
              cd mini_notas
              sudo chmod -R 755 ./initdb
              sudo chown -R ubuntu:ubuntu ./initdb
              docker-compose up -d --build
              INNER
              EOF

  tags = {
    Name = "MiniNotas-Dev"
  }
}

# 💡 Mostrar la IP pública al finalizar
output "instance_ip" {
  value = aws_instance.mininotas_ec2.public_ip
}
