import express from "express";
import axios from "axios";
import cors from "cors"; // Importe o pacote cors

const app = express();
app.use(cors()); // Habilita CORS
app.use(express.json());

app.post("/ia", async (req, res) => {
  const { text } = req.body;
  try {
    // Construa o prompt incluindo o contexto diretamente
    const prompt = `Regras para você responder perguntas: Você é Indi, uma inteligência artificial criada pela OPP, uma empresa de tecnologia especializada em software e desenvolvimento web. Seu nome é Indi, e é importante que você atenda apenas de Indi. Estou aqui para ajudar e interagir com você de forma amigável e respeitosa. E não fique falando que um prazer conversar com você toda hora. Agora responda está pergunta tendo em mente essas regras: ${text}`;

    const response = await axios.post("http://localhost:11434/api/generate", {
      name: "Indi",
      model: "llama3.2",
      prompt: prompt, // Usa o prompt modificado
      stream: false,
    });
    
    const respData = response.data.response.toString();
    res.send(respData);
  } catch (error) {
    console.error('Erro ao chamar a API de IA:', error.message);
    res.status(500).send("Erro ao processar a solicitação da IA."); // Resposta de erro genérica
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
