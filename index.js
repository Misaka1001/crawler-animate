const Crawler = require('crawler')
const crawler = new Crawler({
    jQuery:false,
    callback : function(err, res, done){
        if(err){
            console.log(err)
        }else{
            const result = JSON.parse(res.body).result;
            const list = []
            result.forEach((itemF) => {
                itemF.seasons.forEach(item => {
                    const obj = {
                        isTody : itemF['is_today'],
                        title : item.title,
                        index : item['pub_index'],
                        time : item['pub_time'],
                        isPublish : item['is_published'],
                        day : item['pub_ts']
                    }
                    if(obj.isPublish === 1){
                        list.push(obj)
                    }
                })
            })
            console.log(list)
        }
        done();
    }
})
crawler.queue('https://bangumi.bilibili.com/web_api/timeline_global')