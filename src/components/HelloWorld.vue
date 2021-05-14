<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="6">
                Number 1:
                <input type="number" v-model.number="num1" />
            </v-col>

            <v-col cols="6">
                <div v-if="num2req()">
                    Number 2:
                    <input type="number" v-model.number="num2" />
                </div>
            </v-col>
        </v-row>

        <v-row class="text-center">
            <v-col cols="6">
                Function:
                <select type="select" v-model="fun">
                    <option value="add">Add</option>
                    <option value="multiply">Multiply</option>
                    <option value="square">Square</option>
                    <option value="factorial">Factorial</option>
                </select>
            </v-col>

            <v-col cols="6">
                <button @click="submit" v-if="!loadingText">
                    Submit
                </button>
                <p v-if="loadingText">Loading: {{ loadingText }}</p>
            </v-col>
        </v-row>

        <v-row class="text-center">
            <v-col cols="12">
                <h2>Result: {{ result }}</h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const KEY =
    'edskRro6fiBcG5zaiFisaP3ASVsZLscAA3WDEu16R4JowVmzKfMqwQ8hw6PsS38ax5aeXvKjcXt5uMkkrVbJe7U5niGtZAjpXt';

const CONTRACT_ADDRESS = 'KT1Gva3vCub36nJhhvPvuUt8J6xo8SY2dStD';

const RPC_ADDRESS = 'https://edonet.smartpy.io/';

const Tezos = new TezosToolkit(RPC_ADDRESS);
Tezos.setProvider({
    signer: new InMemorySigner(KEY)
});

export default {
    name: 'HelloWorld',

    data: () => ({
        num1: 5,
        num2: 7,
        fun: 'add',
        loadingText: '',
        result: 0,
        contract: null
    }),

    methods: {
        num2req() {
            return this.fun === 'add' || this.fun === 'multiply';
        },
        async getLatestData() {
            this.loadingText = 'Getting latest data';
            const storage = await this.contract.storage();
            this.result = storage.c[0];
            this.loadingText = '';
        },
        async init() {
            this.loadingText = 'Setting up';
            this.contract = await Tezos.contract.at(CONTRACT_ADDRESS);
            this.getLatestData();
        },
        async submit() {
            try {
                this.loadingText = 'Running function';

                let operation;
                if (this.num2req())
                    operation = await this.contract.methods[this.fun](
                        this.num1,
                        this.num2
                    ).send();
                else
                    operation = await this.contract.methods[this.fun](
                        this.num1
                    ).send();

                this.loadingText = 'Confirming';
                await operation.confirmation(1);
                await this.getLatestData();
            } catch (err) {
                console.log(err);
            }
        }
    },

    created() {
        this.init();
    }
};
</script>
