---
layout: home
pagination:
  enabled: true
---

<!-- 
    Here is the main paginator logic called.
    All calls to site.posts should be replaced by paginator.posts 
-->
{% for post in paginator.posts %}
  <a href="{{ post.url | relative_url }}" class="flex flex-col md:flex-row rounded-lg bg-white hover:bg-gray-100 border shadow-md items-center my-8">
      <img class="w-auto h-auto max-h-full md:max-h-40 md:max-w-xs object-cover rounded-t-lg md:rounded-none md:rounded-l-lg" 
        src="{{ post.cover }}">
      <div class="w-full p-4 flex flex-col justify-between leading-normal">
        <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">
          {{ post.title | escape }}
        </h5>
        <p class="text-sm text-gray-700 mb-3">{{ post.date | date: "%b %-d, %Y" }}</p>
      </div>
  </a>
{% endfor %}

<!-- 
  Showing buttons to move to the next and to the previous list of posts (pager buttons).
-->
{% if paginator.total_pages > 1 %}
<div class="flex mt-4">
  {% if paginator.previous_page %}
    <div class="mr-auto">
      <a class="rounded-full bg-purple-600 py-2 px-4 text-white no-underline" href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&larr; Newer</a>
    </div>
  {% endif %}
  {% if paginator.next_page %}
    <div class="ml-auto">
      <a class="rounded-full bg-purple-600 py-2 px-4 text-white no-underline" href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Older &rarr;</a>
    </div>
  {% endif %}
</div>
{% endif %}

