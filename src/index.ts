import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

class MessageQueue {
  private queue: string[];
  private services: string[];

  constructor() {
    this.queue = [];
    this.services = [];
  }

  public registerService(url: string): void {
    this.services.push(url);
    console.log(`Service registered at ${url}`);
  }

  public enqueueMessage(message: string): void {
    this.queue.push(message);
    console.log('Message added to queue');
  }

  public broadcastMessage(): void {
    if (this.queue.length === 0) {
      return;
    }

    const messagesToBroadcast = [...this.queue];
    this.queue = [];
    messagesToBroadcast.forEach(async (message) => {
      if (!message) return;
      for (const serviceUrl of this.services) {
        try {
          await axios.post(serviceUrl, { message });
          console.log(`Message sent to ${serviceUrl}`);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(`Failed to send message to ${serviceUrl}: ${error.message}`);
          } else if (error instanceof Error) {
            console.error(`Failed to send message to ${serviceUrl}: ${error.message}`);
          } else {
            console.error(`Failed to send message to ${serviceUrl}: ${error}`);
          }
        }
      }
    })
  }
}

const messageQueue = new MessageQueue();

app.post('/register', (req: Request, res: Response) => {
  const { serviceUrl } = req.body;
  if (typeof serviceUrl !== 'string' || !serviceUrl) {
    return res.status(400).send('Service URL is required and must be a string');
  }
  messageQueue.registerService(serviceUrl);
  return res.status(200).send('Service registered successfully');
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.post('/send-message', (req: Request, res: Response) => {
  const { message } = req.body;
  if (typeof message !== 'string' || !message) {
    return res.status(400).send('Message is required and must be a string');
  }
  messageQueue.enqueueMessage(message);
  return res.status(200).send('Message added to queue');
});

const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
  console.log(`Message Queue Service is running on http://localhost:${PORT}`);
});

// Start the background message broadcaster
setInterval(() => {
  messageQueue.broadcastMessage();
}, 5000); // Broadcast every 5 seconds
