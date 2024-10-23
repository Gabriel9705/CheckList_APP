import { z } from "zod";

export const TestesSchema = z.object({
    tecnico: z.string().nonempty({ message: "O nome do técnico não pode está vazio." })
        .refine((value) => !/^\s*$/.test(value), {
            message: "Digite caracteres válidos"
        }),
    grupo: z.string().nonempty({ message: "Selecione um grupo." })
        .refine((value) => !/^\s*$/.test(value), {
            message: "Digite caracteres válidos"
        }),
    subGrupo: z.string().nonempty({ message: "Selecione um subGrupo." })
        .refine((value) => !/^\s*$/.test(value), {
            message: "Digite caracteres válidos"
        }),
    description: z.string().nonempty({ message: "A descrição do teste não pode está vazio." })
        .refine((value) => !/^\s*$/.test(value), {
            message: "Digite caracteres válidos"
        }),
});

export const GruposSchema = z.object({
    grupo: z.string().nonempty({ message: "Digite um grupo." })
        .refine((value) => !/^\s*$/.test(value), {
            message: "Digite caracteres válidos"
        })
});

export const SubGrupoShema = z.object({
    subGrupo: z.string().nonempty({ message: "Digite um subGrupo." })
        .refine((value) => !/^\s*$/.test(value), {
            message: "Digite caracteres válidos"
        })
});
