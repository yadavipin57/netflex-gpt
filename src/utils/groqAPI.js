import Groq from 'groq-sdk';
import { GROQ_API_KEY } from './constants';

const client = new Groq({
  apiKey: GROQ_API_KEY , //process.env['GROQ_API_KEY'], // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export default client;