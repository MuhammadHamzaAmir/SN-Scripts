## Notes to Future me and Others

- When calling a subflow in code and running it in background then,
instead of using this

```javascript
var inputs = {};
inputs['first_name'] = producer.first_name ;
```
&emsp; use this &nbsp; [Source](https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0832622 "Source")

```javascript
var inputs = {};
inputs['first_name'] = "" + producer.first_name ;
```
