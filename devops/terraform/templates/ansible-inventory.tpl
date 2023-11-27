[kafka-client]
%{ for host in clients ~}
${host}
%{ endfor ~}

[kafka-server]
%{ for host in servers ~}
${host}
%{ endfor ~}
