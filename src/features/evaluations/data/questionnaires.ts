export interface Question {
  id: string;
  text: string;
}

export interface QuestionnaireData {
  title: string;
  description: string;
  legend: string[];
  options: number[];
  questions: Question[];
}

export const QUESTIONNAIRES: Record<string, QuestionnaireData> = {
  PHQ9: {
    title: 'Formulario PHQ-9',
    description: 'Durante las últimas 2 semanas, ¿con qué frecuencia ha experimentado los siguientes problemas?',
    legend: ['0. Ningún día', '1. Varios días', '2. Más de la mitad de los días', '3. Casi todos los días'],
    options: [0, 1, 2, 3],
    questions: [
      { id: '1', text: 'Poco interés o placer en hacer cosas' },
      { id: '2', text: 'Sentirse desanimado/a, deprimido/a o sin esperanza' },
      { id: '3', text: 'Dificultad para dormirse, mantenerse dormido/a o dormir demasiado' },
      { id: '4', text: 'Sentirse cansado/a o con poca energía' },
      { id: '5', text: 'Poco apetito o comer en exceso' },
      { id: '6', text: 'Sentirse mal consigo mismo/a, sentir que es un fracaso o que ha decepcionado a sí mismo/a o a su familia' },
      { id: '7', text: 'Dificultad para concentrarse en cosas como leer o ver televisión' },
      { id: '8', text: 'Moverse o hablar tan lento que otras personas podrían notarlo, o al contrario.' },
      { id: '9', text: 'Pensamientos de que estaría mejor muerto(a) o de lastimarse de alguna manera.' },
    ]
  },
  GAD7: {
    title: 'Formulario GAD-7',
    description: 'Durante las últimas 2 semanas, ¿con qué frecuencia ha experimentado los siguientes problemas?',
    legend: ['0. Ningún día', '1. Varios días', '2. Más de la mitad de los días', '3. Casi todos los días'],
    options: [0, 1, 2, 3],
    questions: [
      { id: '1', text: 'Sentirse nervioso/a, ansioso/a o muy alterado/a' },
      { id: '2', text: 'No poder dejar de preocuparse o controlar la preocupación' },
      { id: '3', text: 'Preocuparse demasiado por diferentes cosas' },
      { id: '4', text: 'Dificultad para relajarse' },
      { id: '5', text: 'Estar tan inquieto/a que no puede quedarse quieto/a' },
      { id: '6', text: 'Irritarse o enojarse con facilidad' },
      { id: '7', text: 'Sentir miedo como si algo terrible fuera a suceder' },
    ]
  },
  Variables: {
    title: 'Formulario de Variables',
    description: 'Durante las últimas 2 semanas, ¿con qué frecuencia ha experimentado los siguientes problemas?',
    legend: ['0. Ningún día', '1. Varios días', '2. Más de la mitad de los días', '3. Casi todos los días'], // Assuming same logic for the 0-3 scale mentioned
    options: [0, 1, 2, 3],
    questions: [
      { id: '1.1', text: 'Dificultad para dormirte o mantenerte dormido/a' },
      { id: '1.2', text: 'Despertarte frecuentemente durante la noche' },
      { id: '1.3', text: 'Sentir que tu sueño no ha sido reparador (despertar cansado/a)' },
      { id: '2.1', text: 'Abrumado/a por la cantidad de exigencias académicas (exámenes, trabajos, prácticas)' },
      { id: '2.2', text: 'Incapaz de controlar las cosas importantes relacionadas con tus estudios' },
      { id: '2.3', text: 'Nervioso/a o estresado/a debido a la carga académica' },
      { id: '2.4', text: 'Preocupado/a por no poder cumplir con tus responsabilidades académicas' },
      { id: '3.1', text: '¿Cuántos días realizaste actividad física moderada o intensa de al menos 30 minutos? (caminar rápido, correr, deporte, gimnasio)' },
      { id: '3.2', text: '¿Cuántos días te sentiste con energía física suficiente para realizar tus actividades diarias?' },
      { id: '4.1', text: 'Preocupación por no tener suficiente dinero para cubrir tus necesidades básicas (alimentación, transporte, materiales de estudio)' },
      { id: '4.2', text: 'Angustia por dificultades financieras relacionadas con tus estudios (matrícula, becas, manutención)' },
      { id: '5.1', text: 'Contar con alguien (familia o amigos) con quien hablar cuando tienes problemas' },
      { id: '5.2', text: 'Sentir que tu familia te apoya emocionalmente' },
      { id: '5.3', text: 'Sentir que tus amigos/compañeros se preocupan por ti' },
    ]
  }
};
