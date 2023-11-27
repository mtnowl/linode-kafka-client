# Linode Provider definition
terraform {
  required_providers {
    linode = {
      source = "linode/linode"
      version = "2.5.2"
    }
  }
  backend "s3" {
      endpoints                   = {s3 = "https://us-east-1.linodeobjects.com"}
      skip_credentials_validation = true
      skip_requesting_account_id  = true
      bucket                      = "terraform-backend-testing"
      key                         = "my-kafka-client.tfstate"
      region                      = "us-east-1"
  }
}

provider "linode" {
  token = var.token
}

# Example Web Server
resource "linode_instance" "kafka-client" {
        image = "linode/ubuntu20.04"
        label = "Kafka-Client"
        group = var.group
        region = var.region
        type = "g6-standard-1"
        swap_size = 1024
        authorized_keys = [var.authorized_keys]
        root_pass = var.root_pass
}

# Example Database Server
resource "linode_instance" "kafka-server" {
        image = "linode/ubuntu20.04"
        label = "Kafka-Server"
        group = var.group
        region = var.region
        type = "g6-standard-1"
        swap_size = 1024
        authorized_keys = [var.authorized_keys]
        root_pass = var.root_pass
}

resource "local_file" "ansible_inventory" {
    content = templatefile("${local.templates_dir}/ansible-inventory.tpl", { hosts=[for host in linode_instance.kafka-client.*: "${host.ip_address}"] })
    filename = "${local.devops_dir}/ansible/inventory.ini"
}