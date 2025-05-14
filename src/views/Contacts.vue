<template>
    <div class="contacts">
      <h2>Контакты</h2>
      <p>Телефон: <a href="tel:+79528125252">+7 (952) 812-52-52</a></p>
      <p>Адрес: Санкт-Петербург, ул. Руставели, 33</p>
      <p>График: Пн-Пт 9:00-20:00, Сб-Вс 10:00-18:00</p>
      <p>Реквизиты: ООО "Астра", ИНН 1234567890, ОГРН 0987654321</p>
      <div class="map">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae5fd3317f2e6baa8690fa1e1e8cc5ac1b2727176ebde7c6630d9e5de52cbdc81&source=constructor" width="100%" height="400" frameborder="0"></iframe>
      </div>
    </div>
  </template>
  
  <style scoped>
  .contacts {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 40px;
  }
  
  h2 {
    margin-bottom: 30px;
    font-weight: 600;
  }
  
  p {
    font-size: 18px;
    margin-bottom: 15px;
    color: #5A7A6F;
  }
  
  p a {
    color: #F28C8C;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  p a:hover {
    color: #E8B5A4;
  }
  
  .map {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(42, 42, 42, 0.1);
    margin-top: 30px;
  }
  </style>