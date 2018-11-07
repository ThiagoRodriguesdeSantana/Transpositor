import { Notas } from './Notas';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  notaSelecionada: string[];
  notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#','G', 'G#', 'A', 'A#', 'B'];
  notasDaAfinacao = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb','G', 'Ab', 'A', 'Bb', 'B'];
  notasObj = new Array<Notas>();
  notasTranspostas = new Array<string>();
  afinacao: string;
  

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

    this.AdicionarnotasDaOitavaAbaixo();
    this.AdicionarNotasDasEscalaNatural();
  }




  AdicionarNotasDasEscalaNatural() {
    let valor = 0;
    this.notas.forEach(element => {
      var n = new Notas(element, valor);
      this.notasObj.push(n);
      valor = valor + 0.5;
    });
  }

  private AdicionarnotasDaOitavaAbaixo() {
    let valor = 0.5;
    let oitavasAbaixo = new Array<string>();

    this.notas.forEach(element => {
      oitavasAbaixo.push(element)
    });

    oitavasAbaixo.reverse();
    oitavasAbaixo.forEach(element => {
      let val: number;

      val = valor * -1;

      var n = new Notas(element, val);
      this.notasObj.push(n);
      valor = valor + 0.5;
    });
  }

  transpor() {
    let intervalo = this.obterIntervalo();
    this.notasTranspostas = new Array<string>();

    this.notaSelecionada.forEach(element => {
      let notaNalista: Notas = this.notasObj.find(c => c.nome == element && c.valor >= 0);
      if (notaNalista != null) {
        let calculo = notaNalista.valor - intervalo;

        let notaTransposta = this.notasObj.find(c => c.valor == calculo);
        this.notasTranspostas.push(notaTransposta.nome);      }
    });

    alert(this.notasTranspostas);

  }


  private obterIntervalo() {
    let intervalo = 0.0;

    let valorEncontrado: boolean;
    this.notasDaAfinacao.forEach(element => {
      if (element == this.afinacao) {
        valorEncontrado = true;
      } else if (!valorEncontrado) {
        intervalo = intervalo + 0.5;
      }
    });
    return intervalo;
  }
}
