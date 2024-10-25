import { Component } from '@angular/core';

@Component({
  selector: 'app-mencion',
  templateUrl: './mencion.component.html',
  styleUrl: './mencion.component.css'
})
export class MencionComponent {
  mentions = [
    { label: 'Informática', value: 'informatica', description: 'Tecnologías de la información y computación.' },
    { label: 'Marketing', value: 'marketing', description: 'Estrategias de promoción y ventas.' },
    { label: 'Recursos Humanos', value: 'recursos_humanos', description: 'Gestión de personal y talento.' },
    // Agrega más opciones según sea necesario
  ];
  
  selectedMention: string = '';
  mentionDescription: string = '';

  onMentionChange() {
    const selected = this.mentions.find(m => m.value === this.selectedMention);
    this.mentionDescription = selected ? selected.description : '';
  }
}
