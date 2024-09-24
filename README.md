
# Dependecias

* 1. `React`
* 2. `Framemotion`
* 3. `Typescript`
* 4. `myHelpers`



# Introducción 

# Características Principales:
Compatibilidad con Estilos `CSS` siempre y cuando no esten definidos en la propiedad animate.
Debido a que las propiedad identicas a las animadas que se resetean o se esten aplicando tiene mayor prioridad siempre.
Entonces `RECOMIENDO` el uso de `CSS` siempre y cuando no esten definidas en propiedades animables para evitar inconsistencias.

# Resteo de priopiedades:
El resteo de las propiedades animadas se basan en la acomulacion del uso entre diferentes breakpoints.
Es decir si utilizas {width : 300px} en el brekpoint XS, y pasas al LG, el reseteo seria {width: 0px}, ya que se debe indicar explicitamente el resteo con la propiedad en un valor inicial
por lo tanto el reseteo de {width: 0px} esta presente siempre y cuando no haya otra propiedad igual.


# Recomendación de Uso de la Propiedad style: 
Para garantizar una aplicación coherente de animaciones, recomendamos el uso directo de la propiedad `style` en vez de `CSS`. Esto asegura que tus animaciones se apliquen de manera consistente y no se vean afectadas por reinicios de propiedades (reseteadas).