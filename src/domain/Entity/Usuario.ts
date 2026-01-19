import { DomainException } from "../exceptions/DomainException";

export class Usuario {
    private constructor(
        private readonly nome: string,
        private readonly telefone: string,
        private endereco: string | undefined,
        private estado: string,
        private readonly createdAt: Date,
        private updatedAt: Date
    ) {}

    static create(nome: string, telefone: string): Usuario {
        if (!nome) {
            throw new DomainException("Nome não pode ser nulo");
        }

        if (!telefone) {
            throw new DomainException("Número não pode ser nulo");
        }

        const now = new Date();

        return new Usuario(
            nome,
            telefone,
            undefined,
            'CONVERSA',
            now,
            now
        );
    }

    static restore(
        nome: string,
        telefone: string,
        endereco: string | undefined,
        estado: string,
        createdAt: Date,
        updatedAt: Date
    ): Usuario {
        return new Usuario(
            nome,
            telefone,
            endereco,
            estado,
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
    changeEstado(novoEstado: string){
        if (!novoEstado) {
            throw new DomainException("Endereço inválido");
        }

        this.endereco = novoEstado;
        this.updatedAt = new Date();
    }

    getNome() {
        return this.nome;
    }

    getTelefone() {
        return this.telefone;
    }

    getEndereco() {
        return this.endereco;
    }
    
    getEstado() {
        return this.estado
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}
