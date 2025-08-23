import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from '@supabase/supabase-js';

const sbUrl = import.meta.env.VITE_SUPABASE_BASE_URL;
const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const client = createClient(sbUrl, sbApiKey);

const embeddings = new OpenAIEmbeddings({
  apiKey: openAIApiKey,
  configuration: {
    baseURL: import.meta.env.VITE_OPENAI_BASE_URL
  }
});

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: 'documents',
  queryName: 'match_documents',
});

export const retriever = vectorStore.asRetriever();
