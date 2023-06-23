import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

function criaHashComSal(senha) {
   const sal = randomBytes(16).toString('hex')

   const senhaHasheada = scryptSync(senha, sal, 64).toString('hex');

   return `${sal}:${senhaHasheada}`
}

class Usuario {
   constructor(nome, senha) {
      this.nome = nome;
      [this.sal, this.hash] = criaHashComSal(senha).split(':')
   }
   autentica(nome, senha) {
      if (nome === this.nome) {
         const testeHash = scryptSync(senha, this.sal, 64);
         const hashReal = Buffer.from(this.hash, 'hex');

         const hashCorrespondem = timingSafeEqual(testeHash, hashReal)

         if (hashCorrespondem) {
            console.log('Usuario autenticando com sucesso')
            return true
         }
      }

      console.log('Usuario ou senha incorrenta')
      return false
   }
}

const usuario = new Usuario('Vinicius', '1234')

console.log(usuario)

const autentica = usuario.autentica('Vinicius', '1234')