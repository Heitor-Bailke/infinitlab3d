import { describe, expect, it } from "vitest";
import {
  brand,
  personalizedQuoteMessage,
  productQuoteMessage,
  whatsappUrl,
} from "./content";

describe("mensagens e links de orçamento", () => {
  it("usa o telefone da marca e preserva a mensagem em português", () => {
    const message = "Olá! Quero um orçamento para um chaveiro.";
    const url = new URL(whatsappUrl(message));

    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe(`/${brand.whatsappPhone}`);
    expect(url.searchParams.get("text")).toBe(message);
  });

  it("usa a mensagem padrão quando nenhuma é informada", () => {
    expect(new URL(whatsappUrl()).searchParams.get("text")).toBe(brand.whatsappMessage);
  });

  it("inclui o nome do produto na mensagem de orçamento", () => {
    expect(productQuoteMessage("Porta-panetone personalizado")).toContain("Porta-panetone personalizado");
  });

  it("limpa espaços do nome e informa a cor escolhida", () => {
    expect(personalizedQuoteMessage("  Ana  ", "Azul royal")).toContain("Nome: Ana. Cor: Azul royal.");
  });

  it("usa o texto padrão quando o nome está vazio", () => {
    expect(personalizedQuoteMessage("   ", "Azul royal")).toContain("Nome: sem nome. Cor: Azul royal.");
  });
});
