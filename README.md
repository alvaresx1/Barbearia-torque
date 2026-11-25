# Torque Barbearia: site institucional (projeto de portfólio)

Site responsivo para barbearia, feito com **HTML, CSS e JavaScript puro**, sem frameworks e sem dependências.

> **Projeto fictício.** O nome "Torque Barbearia", o endereço, o telefone e a equipe são ilustrativos. As fotos são do [Unsplash](https://unsplash.com), usadas sob a licença do Unsplash.

## Funcionalidades

- Tabela de serviços e preços gerada a partir de um objeto de configuração
- Destaque para plano mensal de assinatura
- Galeria de fotos
- Apresentação da equipe
- **Formulário de agendamento**: o cliente escolhe serviço, barbeiro, data e horário, e o site monta uma mensagem pronta no WhatsApp
- Botão flutuante de WhatsApp
- Link para o Google Maps
- Layout responsivo (celular, tablet e desktop)
- Acessível: HTML semântico, labels nos campos, textos alternativos nas imagens e foco visível

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, Grid, variáveis CSS, media queries)
- JavaScript (ES6+, manipulação de DOM)
- Google Fonts (Oswald e Inter)

## Reaproveitando para outro cliente

Todo o conteúdo variável fica no objeto `CONFIG`, no início do `script.js`:

```js
const CONFIG = {
  nome: "Torque Barbearia",
  whatsapp: "5511900000000",
  endereco: "Rua das Navalhas, 123 – Centro, São Paulo - SP",
  horario: "Ter a Sex, 9h às 20h · Sáb, 8h às 18h",
  servicos: [ /* categorias e preços */ ],
  equipe: [ /* barbeiros */ ]
};
```

Basta trocar esses dados (e as fotos no `index.html`) para gerar o site de outra barbearia.

