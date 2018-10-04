module.exports = {
  "sys":{
    "space": {
      "sys": {
        "type": "Link",
        "linkType": "Space",
        "id": "ip74mqmfgvqf"
      }
    },
    "id": "drug",
    "type": "ContentType",
    "createdAt": "2018-10-04T11:48:06.631Z",
    "updatedAt": "2018-10-04T11:48:55.611Z",
    "createdBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "7sIkrqOAkQT2PLLlnvWzTb"
      }
    },
    "updatedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "7sIkrqOAkQT2PLLlnvWzTb"
      }
    },
    "publishedCounter": 1,
    "version": 3,
    "publishedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "7sIkrqOAkQT2PLLlnvWzTb"
      }
    },
    "publishedVersion": 2,
    "firstPublishedAt": "2018-10-04T11:48:55.611Z",
    "publishedAt": "2018-10-04T11:48:55.611Z"
  },
  "displayField":"title",
  "name":"Category",
  "description":"Categories can be applied to Courses and Lessons. Assigning Multiple categories is also possible.",
  "fields":[
    {
      "id":"title",
      "name":"Title",
      "type":"Symbol",
      "localized":true,
      "required":true,
      "validations":[

      ],
      "disabled":false,
      "omitted":false
    },
    {
      "id":"slug",
      "name":"Slug",
      "type":"Symbol",
      "localized":false,
      "required":true,
      "validations":[
        {
          "unique":true
        }
      ],
      "disabled":false,
      "omitted":false
    }
  ]
}