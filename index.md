---
layout: home
pagination:
  enabled: true
---
<main>
  <!-- 
      Here is the main paginator logic called.
      All calls to site.posts should be replaced by paginator.posts 
  -->
  {% for post in paginator.posts %}
    <article>
      <!-- <img class="w-auto h-auto max-h-full md:max-h-40 md:max-w-xs object-cover rounded-t-lg md:rounded-none md:rounded-l-lg" 
        src="{{ post.cover }}"> -->
      <!-- <div class="w-full p-4 flex flex-col justify-between leading-normal"> -->
        <h5>
          <a href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </h5>
        <dl>
          <div>
            <dt>Published on</dt>
            <dd>
              <time datetime="{{ post.date | date: '%d-%m-%Y' }}">{{ post.date | date: "%d-%m-%Y" }}</time>
            </dd>
          </div>
        </dl>
    </article>
  {% endfor %}

  <!-- 
    Showing buttons to move to the next and to the previous list of posts (pager buttons).
  -->
  {% if paginator.total_pages > 1 %}
  <div class="navigation">
    {% if paginator.previous_page %}
      <div class="navigation--previous">
        <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&larr; Newer</a>
      </div>
    {% endif %}
    {% if paginator.next_page %}
      <div class="navigation--next">
        <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Older &rarr;</a>
      </div>
    {% endif %}
  </div>
  {% endif %}
</main>
