    module.exports = function (context, req) {
    
    var SSH = require('simple-ssh') 

    var ssh = new SSH ({
        host: '54.212.43.33',
        user: process.env["SSH_USERNAME"],
        pass: process.env["SSH_PASSWORD"]
    });

let line1 = 'echo ' + context.bindingData.ip + '>' + '/etc/ansible/hosts' ; 
let line2 = 'echo ' + '[all:vars]' + '>>' + '/etc/ansible/hosts' ;
let line3 = 'echo ' + 'ansible_user=' + context.bindingData.user + '>>' + '/etc/ansible/hosts' ;
let line4 = 'echo ' + 'ansible_ssh_pass='+ context.bindingData.password + '>>' + '/etc/ansible/hosts' ;

let command1 = line1 + ';' + line2 + ';' + line3 + ';' + line4 ;

let command2 = 'ansible-playbook UbuntuReact.yml ' + '-e "' + 'ansible_python_interpreter=/usr/bin/python3' + '"' ;

let command =  command1 + ';' + command2 ;

        ssh.exec(command , {
        out: function(stdout) {
            context.log(stdout);
            context.log("SSH Connection code");
        }
    })

        context.done();
    ssh.start();
        }