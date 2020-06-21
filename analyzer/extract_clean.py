import json
from bs4 import BeautifulSoup
from collections import defaultdict
import util

def clean(data):
    clean_data = {}
    names = defaultdict(int)
    CATEGORY = {
        '送闲置': {'送闲置', '送留置', '免费送', },
        '出闲置': {'出闲置', '换闲置'},
        '求闲置': {'求闲置', '收闲置', },
        
        '出房子': {'出房子', '出租房', '转租房', '卖房子', '转店铺', '出店铺', '出房间', '招短租', '招租客', '招找房'},
        '找房子': {'找房子', '求短租', '找短租', '求房子', '求房源', '找房源', '求租房', '租房子', '找租房', },
        '找合租': {'招室友', '招合租', '找室友', '求合租', '找舍友', '找合租'},

        '提问题': {'提问题'},
        
        '招员工': {'招员工', '招兼职', '招学生', '找员工', '招演员', },
        '找工作': {'找工作', '找兼职', '求兼职', },

        '可帮忙': {'可帮忙', '帮租房', '美发店', '办签证', '奶茶店', '买手店', '供帮忙', '帮免税', '帮接机', },
        '找帮忙': {'找帮忙', '求帮忙', '找免税', '找老师', '找拼邮', },

        '出宠物': {'出宠物', '送宠物', '转宠物', },
        '求宠物': {'求宠物', '收宠物', '找宠物', },

        '找帮带': {'找帮带', '求帮带', '帮忙带', },
        '可帮带': {'可帮带', '可绑带', '帮带物', '供帮带'},

        '找伙伴': {'找伙伴', '找同伴', '小姐姐', '小哥哥'},
        '找前辈': {'找前辈', '求前辈', },
    }

    for date, article in data.items():
        soup = BeautifulSoup(article, "html.parser")
        spans = soup("p")
        d = defaultdict(list)
        for s in spans:
            txt = s.get_text()
            if not txt or txt[0] != '【':
                continue

            tag = txt[1:4]
            names[tag] += 1

            for k, v in CATEGORY.items():
                if tag in v:
                    d[k].append(txt[5:-7])
                    break
        clean_data[date] = d
        print(date + 'finished.')

    print('finished.')
    # print(names)
    return clean_data


def main():
    articles = util.read_data('../data/articles.json')
    clean_data = clean(articles)
    util.save_data(clean_data, '../data/clean.json')

if __name__ == '__main__':
    main()