---
layout: home
---
<section class="home-box">
  <div class="home-box__room">
    <h3>Years</h3>
    {% for year in site.data.years %}
      <a href="{{ site.url | relative_url }}/archives/{{ year }}">{{ year }}</a>
    {% endfor %}
  </div>

  <div class="home-box__room">
    <h3>Tags</h3>
    {% assign tags = site.posts | map: "tags" | compact | uniq %}
    {% for item in tags %}
      <a href="{{ site.url | relative_url }}/archives/tag/{{ item }}">{{ item }}</a>
    {% endfor %}
  </div>
</section>
