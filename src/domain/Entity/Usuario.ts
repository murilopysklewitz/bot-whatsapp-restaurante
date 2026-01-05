import { DomainException } from "../exceptions/DomainException";

export class Usuario {
    private constructor(
        private readonly id: number | null,
        private readonly nome: string,
        private readonly numero: string,
        private endereco: string | undefined,
        private readonly createdAt: Date,
        private updatedAt: Date
    ) {}

    static create(nome: string, numero: string): Usuario {
        if (!nome) {
            throw new DomainException("Nome não pode ser nulo");
        }

        if (!numero) {
            throw new DomainException("Número não pode ser nulo");
        }

        const now = new Date();

        return new Usuario(
            null,
            nome,
            numero,
            undefined,
            now,
            now
        );
    }

    static restore(
        id: number,
        nome: string,
        numero: string,
        endereco: string | undefined,
        createdAt: Date,
        updatedAt: Date
    ): Usuario {
        return new Usuario(
            id,
            nome,
            numero,
            endereco,
            createdAt,
            updatedAt
        );
    }

    changeEndereco(novoEndereco: string): void {
        if (!novoEndereco) {
            throw new DomainException("Endereço inválido");
        }

        this.endereco = novoEndereco;
        this.updatedAt = new Date();
    }

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getNumero() {
        return this.numero;
    }

    getEndereco() {
        return this.endereco;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}
