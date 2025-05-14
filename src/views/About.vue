<template>
    <div class="about">
      <h2>О нас</h2>
      <p>Мы - "Астра", ваш цветочный магазин в Санкт-Петербурге. Наша цель - приносить радость через красоту цветов. Каждый букет создан с любовью и заботой.</p>
      <div class="map">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae5fd3317f2e6baa8690fa1e1e8cc5ac1b2727176ebde7c6630d9e5de52cbdc81&source=constructor" width="100%" height="400" frameborder="0"></iframe>
      </div>
    </div>
  </template>
  
  <style scoped>
  .about {
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
    color: #6D8299;
    margin-bottom: 30px;
  }
  
  .map {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(47, 47, 47, 0.1);
  }
  </style>