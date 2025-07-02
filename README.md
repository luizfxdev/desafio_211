Calculadora Galáctica de Pontos de XP

🪐 Imagine que você faz parte de uma guilda intergaláctica de mercenários espaciais que recebem missões em diferentes planetas e zonas do universo! 
Após completarem as missões, vocês recebem pontos de XP que variam de acordo com o tipo de missão completada e o planeta em que foi realizada. Sua missão é criar uma função que, dada uma lista de missões completadas, calcule o total de XP!

🌌 Aqui estão as regras para calcular os pontos de XP:

Missões normais: 50 XP
Missões secretas: 100 XP 💥
Missões em planetas hostis: multiplicar o XP da missão por 2 🚀
Cada missão é um objeto com as seguintes propriedades:

{
  tipo: 'normal' ou 'secreta',
  planetaHostil: true ou false
}
🛸 Como exemplo de entrada, veja a lista de missões abaixo:

[
  { tipo: 'normal', planetaHostil: false },
  { tipo: 'secreta', planetaHostil: true },
  { tipo: 'normal', planetaHostil: true }
]
Para essas missões, seu programa deve retornar 350 XP.
