// class Suber
class Suber {
  constructor(name, context) {
    this.name = name
    this._context = context
    this._pubers = {}
  }

  rss(puber, rss) {
    // TODO
    // check rss

    if (!(puber instanceof Puber)) {
      throw new Error('puber must be instanceof Puber.')
    }

    const _currentPuber = this._pubers[puber.name]
    rss = Array.isArray(rss) ? rss : [rss]

    if (_currentPuber) {
      _currentPuber.rss.concat(rss)
    } else {
      this._pubers[puber.name] = {
        puber: puber,
        rss: rss,
      }
    }

    return this
  }
}

// class Puber
class Puber {
  constructor(name, context) {
    this.name = name
    this._context = context
    this._subers = {}
  }

  addSuber(suber) {
    if (this._subers[suber.name]) {
      throw new Error(
        'This suber has already exists, it can not rss [' +
          this.name +
          '] again.'
      )
    }

    this._subers[suber.name] = suber
  }

  pub(msg, payload) {
    for (let suberKey in this._subers) {
      // find self
      const self = this._subers[suberKey]._pubers[this.name]

      // find cache handler
      const cacheHandler = self.cacheRss && self.cacheRss[msg]

      if (cacheHandler) {
        cacheHandler.call(self._context, payload)
      } else {
        self.rss.forEach((rss) => {
          if (rss.msg === msg) {
            // exec first
            rss.handler.call(self._context, payload)

            // create cache area
            if (!self.cacheRss) {
              self.cacheRss = {}
            }

            // add cache
            self.cacheRss[msg] = rss.handler
          }
        })
      }
    }
  }
}

const PS = { Puber, Suber }

export default PS
