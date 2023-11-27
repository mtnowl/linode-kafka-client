[kafkaclient]
%{ for host in clients ~}
${host}
%{ endfor ~}

[kafkaserver]
%{ for host in servers ~}
${host}
%{ endfor ~}
