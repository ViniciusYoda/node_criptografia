import { createHash } from 'crypto';

function criaHash(senha) {
   return createHash('sha256').update(senha).digest('hex')
}

class Usuario {
   constructor(nome, senha){
      this.nome = nome;
      this.hash = criaHash(senha);
   }

   autentica(nome, senha) {
      if (nome === this.nome && this.hash === criaHash(senha)) {
         console.log("Usuário cadastrado com sucesso!")
         return true
      }

      console.log('Usuário ou senha incorreta')
      return false
   }
}

const usuario = new Usuario('Vinícius', '123')

console.log(usuario)

const autentica = usuario.autentica('Vinícius', '123')

console.log(autentica)

