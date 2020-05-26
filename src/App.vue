<template>
	<div id="app">

		<div class="usuario__titulo" align-v="center">
			<div class="container">
				<p> Cadastro de </p> <span>Usuários</span>
			</div>
		</div>
		
		<div class="container">

			<b-button @click="obterUsuarios"
				size="sm" variant="primary" class="mb-4 mt-4 usuario__btnIcon">
				<span class="material-icons mr-2">account_box</span>
				ver usuarios
			</b-button>

			<b-alert show dismissible v-for="mensagem in mensagens" 
				:key="mensagem.texto"
				:variant="mensagem.tipo"> {{ mensagem.texto }} </b-alert>

			<b-card>
				<b-row>
					<b-col cols="8">
						<b-form-group label="Nome">
							<b-form-input type="text"
							v-model="usuario.nome"
							placeholder="Informar Nome"></b-form-input>
						</b-form-group>

					</b-col>

					<b-col>
						<b-form-group label="CPF">
							<b-form-input type="number"
							v-model="usuario.cpf"
							placeholder="CPF"></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col cols="3">
						<b-form-group label="Data Nascimento">
							<b-form-input type="date"
							v-model="usuario.dataNascimento"
							placeholder="data nascimento"></b-form-input>
						</b-form-group>
					</b-col>

					<b-col>
						<b-form-group label="Email">
							<b-form-input type="email"
							v-model="usuario.email"
							placeholder="Informar E-mail"></b-form-input>
						</b-form-group>
					</b-col>

					<b-col>
						<b-form-group label="Telefone">
							<b-form-input type="tel"
							v-model="usuario.telefone"
							placeholder="Telefone"></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>

					<b-col cols="5">
						<b-form-group label="Endereco">
							<b-form-input type="text"
							v-model="usuario.endereco"
							placeholder="Endereço"></b-form-input>
						</b-form-group>
					</b-col>

					<b-col cols="2">
						<b-form-group label="Número">
							<b-form-input type="number"
							v-model="usuario.numero"
							placeholder="Número"></b-form-input>
						</b-form-group>
					</b-col>

					<b-col cols="3">
						<b-form-group label="Cidade">
							<b-form-input type="text"
							v-model="usuario.cidade"
							placeholder="Cidade"></b-form-input>
						</b-form-group>
					</b-col>

					<b-col cols="2">
						<b-form-group label="Estado">
							<b-form-input type="text"
							v-model="usuario.estado"
							placeholder="Estado"></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row class="mt-4">
					<b-col>
						<b-button @click="salvar" class="usuario__btnIcon"
							variant="primary" size="sm">
							<span class="material-icons mr-2">save</span>
							salvar
						</b-button>
					</b-col>
				</b-row>
			</b-card>

			<b-list-group class="mt-4 mb-4">

				<b-list-group-item v-for="(usuario, id) in usuarios" :key="id" class="usuario__lista mt-4">

					<div>
						<li v-b-modal="id"> 
							{{ usuario.nome }} 
						</li>

						<div class="usuario__control">
							<span class="material-icons mr-2" 
								v-b-tooltip.hover title="Alterar Usuário" 
								@click="carregar(id)">create
							</span>
							<span class="material-icons" 
								v-b-tooltip.hover title="Excluir" 
								@click="excluir(id)">delete
							</span>
						</div>

					</div>

				</b-list-group-item>

			</b-list-group>

			<b-modal size="lg" :id="id" v-for="(usuario, id) in usuarios" :key="id" ok-only>

				<b-container class="usuario__modal">
					<b-row>
						<b-col cols="8">
							<b>Nome:</b> {{ usuario.nome }}
						</b-col>
						<b-col>
							<b>CPF:</b> {{ usuario.cpf }}
						</b-col>
					</b-row>

					<b-row>
						<b-col>
							<b>Telefone: </b> {{ usuario.telefone }}
						</b-col>
						<b-col>
							<b>E-mail:</b> {{ usuario.email }}
						</b-col>
					</b-row>

					<b-row>
						<b-col cols="8">
							<b>Endereço: </b> {{ usuario.endereco }}
						</b-col>
						<b-col>
							<b>Número: </b> {{ usuario.numero }}
						</b-col>
					</b-row>

					<b-row>
						<b-col cols="8">
							<b>Cidade: </b> {{ usuario.cidade }}
						</b-col>
						<b-col>
							<b>Estado: </b> {{ usuario.estado }}
						</b-col>
					</b-row>
				</b-container>

			</b-modal>

		</div>

	</div>
</template>

<script>
export default {
	data () {
		return {
			mensagens: [],
			usuarios: [],
			id: null,
			usuario: {
				nome: '',
				cpf: '',
				dataNascimento: '',
				email: '',
				telefone: '',
				endereco: '',
				numero: '',
				cidade: '',
				estado: ''
			}
		}
	},
	methods: {
		limpar() {
			this.usuario.nome = ''
			this.usuario.cpf = ''
			this.usuario.dataNascimento = ''
			this.usuario.email = ''
			this.usuario.telefone = ''
			this.usuario.endereco = ''
			this.usuario.numero = ''
			this.usuario.cidade = ''
			this.usuario.estado = ''
			this.id = null
			this.mensagens = []
		},
		carregar(id) {
			this.id = id
			this.usuario = { ...this.usuarios[id] }
		},
		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`)
			.then(res => this.limpar())
			.catch(err => {
				this.mensagens.push({
					texto: 'Problema em excluir',
					tipo: 'danger'
				})
			})
		},
		salvar() {
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'

			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)
				.then(res => {
					this.limpar()
					this.mensagens.push({
						texto: 'Operação realizada com sucesso',
						tipo: 'success'
					})
				})
		},
		obterUsuarios() {
			this.$http('usuarios.json')
				.then(res => {
					this.usuarios = res.data
				})
		},
	}
}
</script>