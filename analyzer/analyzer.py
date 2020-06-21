import json
from wordcloud import WordCloud, ImageColorGenerator
import numpy as np
import util
from PIL import Image
import matplotlib.pyplot as plt
from collections import defaultdict, Counter

def createStopwords(path):
    with open(path, 'r', encoding='utf-8') as f:
        stop = set([line.rstrip('\n') for line in f])
    stop.update(['二手', '一个', ' ', ])
    return stop

def makeImage(dic):
    mask = np.array(Image.open("../resources/pika.jpg"))
    mask[mask>220] = 255
    image_colors = ImageColorGenerator(mask)
    wc = WordCloud(background_color='gray', font_path="../resources/yahei.ttf", mask=mask)

    # generate word cloud
    wc.generate_from_frequencies(dic)

    # show
    # plt.imshow(wc, interpolation="bilinear")
    plt.imshow(wc.recolor(color_func=image_colors), interpolation="bilinear")
    plt.axis("off")
    plt.show()


def freAna(data):
    fre_d = defaultdict(list)
    stopwords = createStopwords('../resources/cn_stopwords.txt')
    for date, a in data.items():
        for k, v in a.items():
            fre_d[k] += v
    for k, v in fre_d.items():
        fre_d[k] = {a: b for a, b in Counter(v).most_common() if a not in stopwords}
    return fre_d


def main():
    data = util.read_data('../data/seg.json')
    fre_d = freAna(data)
    makeImage(fre_d['求闲置'])

if __name__ == "__main__":
    main()