---
layout: home
pagination:
  enabled: true
---
<section class="home-box">
  {% for info in site.data.info %}
    <div class="home-box__room">
      <h2 class="--salmon">{{ info.title }}</h2>
      <ul>
        {% for post in site.categories[info.name] limit: 6 %}
          <li class="blog-item">
            <a class="blog-item__title" href="{{ post.url }}">{{ post.title }}</a>
            <div class="blog-item__info">
              <i class="typcn typcn-calendar-outline"></i> {{ post.date | date: "%d-%m-%Y" }}
            </div>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</section>