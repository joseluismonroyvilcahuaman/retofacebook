module.exports = {
  default: {
    require: [
      './steps/**/*.ts', // Ruta a los archivos de pasos
      './hooks/**/*.ts', // Ruta a los hooks si los tienes
    ],
    paths: ['./features/**/*.feature'], // Ruta a los archivos .feature
    publishQuiet: true, // Evita logs innecesarios
    format: ['progress', 'html:reports/report.html'], // Formatos de salida
  },
};
