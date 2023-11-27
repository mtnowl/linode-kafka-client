variable "token" {}
variable "authorized_keys" {}
variable "root_pass" {}
variable "client_instance_count" {
  default = "2"
}
variable "region" {
  default = "us-east"
}
variable "group" {
  default = "my-kafka-client"
}