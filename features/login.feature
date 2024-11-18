Feature: Login en Facebook

  Scenario: Login exitoso con credenciales válidas
    Given que el usuario está en la página de login
    When ingresa un correo y una contraseña válidos
    Then debería iniciar sesión exitosamente

  Scenario: Login fallido con credenciales incorrectas
    Given que el usuario está en la página de login
    When ingresa un correo y una contraseña incorrectos
    Then debería ver un mensaje de error
