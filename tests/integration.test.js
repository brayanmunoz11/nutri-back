//importamos la libreria supertesr
const { response } = require('express');
const supertest = require('supertest')
//importamos la app
const { app } = require('../index')
//App + supertest
const api = supertest(app)
//Definicion del pool sql
//const pool = require('../src/database');
//Nos trae el metodo para hacer querys a la BD
const pool = require('../src/database');
//Nos trae el metodo para hacer querys a la BD




//Declaracion de un describe de tests
describe('MOCK INTEGRATION', () => {

  test('Get /Listar Tareas', async () => {

  
    //Act
    //Hacemos la llamada a la ruta de la api
    const response  = await api
      .get('/list-task-submissions/85')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      //assert
      
      expect(response.body).toBeDefined()
  })

  test('Get /Listar Material', async () => {
    //Act
    //Hacemos la llamada a la ruta de la api

    const response  = await api

      
      .get('/listMaterials/35')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      //assert
      expect(response.body).toBeDefined()
  })


  
  
})



afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  })