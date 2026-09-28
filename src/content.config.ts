// Schema do conteúdo do site e fonte de verdade do contrato descrito.
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Lista fechada: tag digitada errado quebra o build em vez de criar uma
// categoria nova com uma pílula só. Tag nova muda o contrato e pede issue.
const TAGS = ['infra', 'go', 'banco', 'deploy', 'frontend', 'seguranca'] as const;

// Só https, para o site nunca apontar para um endereço sem certificado.
const https = z.url({ protocol: /^https$/ });

const projetos = defineCollection({
  loader: glob({ base: './src/content/projetos', pattern: '**/*.mdx' }),
  schema: z.object({
    nome: z.string(),
    resumo: z.string().max(220),
    status: z.enum(['no-ar', 'em-construcao']),
    // Sem url, o projeto não entra no quadro "rodando agora".
    url: https.optional(),
    // Sem repo, o projeto não ganha card: o site não afirma o que não existe.
    repo: https.optional(),
    // O primeiro item é o principal e ganha destaque no card.
    stack: z.array(z.string()).min(1),
    papel: z.string().optional(),
    // Data sem hora vira meia-noite UTC. Formatar só pela função única, em UTC.
    desde: z.coerce.date().optional(),
    visual: z.enum(['laranja', 'verde', 'violeta', 'neutro']).default('neutro'),
    ordem: z.number().int(),
    rascunho: z.boolean().default(false),
  }),
});

const pilulas = defineCollection({
  loader: glob({ base: './src/content/pilulas', pattern: '**/*.mdx' }),
  schema: z
    .object({
      titulo: z.string(),
      resumo: z.string().max(180),
      // Dia em que a pílula foi escrita. Não muda depois de publicada.
      data: z.coerce.date(),
      tags: z.array(z.enum(TAGS)).min(1),
      // Precisa ser o nome de um arquivo em src/content/projetos/.
      projeto: reference('projetos').optional(),
      atualizado: z.coerce.date().optional(),
      rascunho: z.boolean().default(false),
    })
    // Validação que um campo sozinho não faz: compara dois campos.
    .refine((p) => !p.atualizado || p.atualizado > p.data, {
      message: '`atualizado` precisa ser posterior a `data`.',
      path: ['atualizado'],
    }),
});

export const collections = { projetos, pilulas };