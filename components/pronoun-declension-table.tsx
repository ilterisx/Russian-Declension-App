"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, ChevronRight, BookOpen, User, Users, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Define TypeScript interfaces for our data structures
interface AccusativeForm {
  animate: string
  inanimate: string
}

// Define types for all possible pronoun types
type PronounType = "personal" | "possessive" | "demonstrative" | "interrogative" | "negative" | "reflexive"
type PersonNumber = "singular" | "plural"
type Person = "first" | "second" | "third"
type Gender = "masculine" | "feminine" | "neuter"
type Case = "nominative" | "genitive" | "dative" | "accusative" | "instrumental" | "prepositional"
type PossessiveType = "my" | "your" | "our" | "your_plural" | "reflexive" | "his" | "her" | "their"
type DemonstrativeType = "this" | "that"
type InterrogativeType = "who" | "what" | "which" | "whose"
type NegativeType = "nobody" | "nothing" | "no_one_to" | "nothing_to"
type ReflexiveType = "oneself" | "each_other"

// Russian personal pronouns data
const personalPronouns = {
  singular: {
    first: {
      nominative: "я",
      genitive: "меня",
      dative: "мне",
      accusative: "меня",
      instrumental: "мной",
      prepositional: "мне",
    },
    second: {
      nominative: "ты",
      genitive: "тебя",
      dative: "тебе",
      accusative: "тебя",
      instrumental: "тобой",
      prepositional: "тебе",
    },
    third: {
      masculine: {
        nominative: "он",
        genitive: "его",
        dative: "ему",
        accusative: "его",
        instrumental: "им",
        prepositional: "нём",
      },
      feminine: {
        nominative: "она",
        genitive: "её",
        dative: "ей",
        accusative: "её",
        instrumental: "ей",
        prepositional: "ней",
      },
      neuter: {
        nominative: "оно",
        genitive: "его",
        dative: "ему",
        accusative: "его",
        instrumental: "им",
        prepositional: "нём",
      },
    },
  },
  plural: {
    first: {
      nominative: "мы",
      genitive: "нас",
      dative: "нам",
      accusative: "нас",
      instrumental: "нами",
      prepositional: "нас",
    },
    second: {
      nominative: "вы",
      genitive: "вас",
      dative: "вам",
      accusative: "вас",
      instrumental: "вами",
      prepositional: "вас",
    },
    third: {
      nominative: "они",
      genitive: "их",
      dative: "им",
      accusative: "их",
      instrumental: "ими",
      prepositional: "них",
    },
  },
}

// Russian possessive pronouns data
const possessivePronouns = {
  my: {
    singular: {
      masculine: {
        nominative: "мой",
        genitive: "моего",
        dative: "моему",
        accusative: {
          animate: "моего",
          inanimate: "мой",
        },
        instrumental: "моим",
        prepositional: "моём",
      },
      feminine: {
        nominative: "моя",
        genitive: "моей",
        dative: "моей",
        accusative: "мою",
        instrumental: "моей",
        prepositional: "моей",
      },
      neuter: {
        nominative: "моё",
        genitive: "моего",
        dative: "моему",
        accusative: "моё",
        instrumental: "моим",
        prepositional: "моём",
      },
    },
    plural: {
      nominative: "мои",
      genitive: "моих",
      dative: "моим",
      accusative: {
        animate: "моих",
        inanimate: "мои",
      },
      instrumental: "моими",
      prepositional: "моих",
    },
  },
  your: {
    singular: {
      masculine: {
        nominative: "твой",
        genitive: "твоего",
        dative: "твоему",
        accusative: {
          animate: "твоего",
          inanimate: "твой",
        },
        instrumental: "твоим",
        prepositional: "твоём",
      },
      feminine: {
        nominative: "твоя",
        genitive: "твоей",
        dative: "твоей",
        accusative: "твою",
        instrumental: "твоей",
        prepositional: "твоей",
      },
      neuter: {
        nominative: "твоё",
        genitive: "твоего",
        dative: "твоему",
        accusative: "твоё",
        instrumental: "твоим",
        prepositional: "твоём",
      },
    },
    plural: {
      nominative: "твои",
      genitive: "твоих",
      dative: "твоим",
      accusative: {
        animate: "твоих",
        inanimate: "твои",
      },
      instrumental: "твоими",
      prepositional: "твоих",
    },
  },
  our: {
    singular: {
      masculine: {
        nominative: "наш",
        genitive: "нашего",
        dative: "нашему",
        accusative: {
          animate: "нашего",
          inanimate: "наш",
        },
        instrumental: "нашим",
        prepositional: "нашем",
      },
      feminine: {
        nominative: "наша",
        genitive: "нашей",
        dative: "нашей",
        accusative: "нашу",
        instrumental: "нашей",
        prepositional: "нашей",
      },
      neuter: {
        nominative: "наше",
        genitive: "нашего",
        dative: "нашему",
        accusative: "наше",
        instrumental: "нашим",
        prepositional: "нашем",
      },
    },
    plural: {
      nominative: "наши",
      genitive: "наших",
      dative: "нашим",
      accusative: {
        animate: "наших",
        inanimate: "наши",
      },
      instrumental: "нашими",
      prepositional: "наших",
    },
  },
  your_plural: {
    singular: {
      masculine: {
        nominative: "ваш",
        genitive: "вашего",
        dative: "вашему",
        accusative: {
          animate: "вашего",
          inanimate: "ваш",
        },
        instrumental: "вашим",
        prepositional: "вашем",
      },
      feminine: {
        nominative: "ваша",
        genitive: "вашей",
        dative: "вашей",
        accusative: "вашу",
        instrumental: "вашей",
        prepositional: "вашей",
      },
      neuter: {
        nominative: "ваше",
        genitive: "вашего",
        dative: "вашему",
        accusative: "ваше",
        instrumental: "вашим",
        prepositional: "вашем",
      },
    },
    plural: {
      nominative: "ваши",
      genitive: "ваших",
      dative: "вашим",
      accusative: {
        animate: "ваших",
        inanimate: "ваши",
      },
      instrumental: "вашими",
      prepositional: "ваших",
    },
  },
  reflexive: {
    singular: {
      masculine: {
        nominative: "свой",
        genitive: "своего",
        dative: "своему",
        accusative: {
          animate: "своего",
          inanimate: "свой",
        },
        instrumental: "своим",
        prepositional: "своём",
      },
      feminine: {
        nominative: "своя",
        genitive: "своей",
        dative: "своей",
        accusative: "свою",
        instrumental: "своей",
        prepositional: "своей",
      },
      neuter: {
        nominative: "своё",
        genitive: "своего",
        dative: "своему",
        accusative: "своё",
        instrumental: "своим",
        prepositional: "своём",
      },
    },
    plural: {
      nominative: "свои",
      genitive: "своих",
      dative: "своим",
      accusative: {
        animate: "своих",
        inanimate: "свои",
      },
      instrumental: "своими",
      prepositional: "своих",
    },
  },
  his: {
    singular: {
      masculine: {
        nominative: "его",
        genitive: "его",
        dative: "его",
        accusative: "его",
        instrumental: "его",
        prepositional: "его",
      },
      feminine: {
        nominative: "его",
        genitive: "его",
        dative: "его",
        accusative: "его",
        instrumental: "его",
        prepositional: "его",
      },
      neuter: {
        nominative: "его",
        genitive: "его",
        dative: "его",
        accusative: "его",
        instrumental: "его",
        prepositional: "его",
      },
    },
    plural: {
      nominative: "его",
      genitive: "его",
      dative: "его",
      accusative: "его",
      instrumental: "его",
      prepositional: "его",
    },
    all: "его",
  },
  her: {
    singular: {
      masculine: {
        nominative: "её",
        genitive: "её",
        dative: "её",
        accusative: "её",
        instrumental: "её",
        prepositional: "её",
      },
      feminine: {
        nominative: "её",
        genitive: "её",
        dative: "её",
        accusative: "её",
        instrumental: "её",
        prepositional: "её",
      },
      neuter: {
        nominative: "её",
        genitive: "её",
        dative: "её",
        accusative: "её",
        instrumental: "её",
        prepositional: "её",
      },
    },
    plural: {
      nominative: "её",
      genitive: "её",
      dative: "её",
      accusative: "её",
      instrumental: "её",
      prepositional: "её",
    },
    all: "её",
  },
  their: {
    singular: {
      masculine: {
        nominative: "их",
        genitive: "их",
        dative: "их",
        accusative: "их",
        instrumental: "их",
        prepositional: "их",
      },
      feminine: {
        nominative: "их",
        genitive: "их",
        dative: "их",
        accusative: "их",
        instrumental: "их",
        prepositional: "их",
      },
      neuter: {
        nominative: "их",
        genitive: "их",
        dative: "их",
        accusative: "их",
        instrumental: "их",
        prepositional: "их",
      },
    },
    plural: {
      nominative: "их",
      genitive: "их",
      dative: "их",
      accusative: "их",
      instrumental: "их",
      prepositional: "их",
    },
    all: "их",
  },
}

// Russian demonstrative pronouns data
const demonstrativePronouns = {
  this: {
    singular: {
      masculine: {
        nominative: "этот",
        genitive: "этого",
        dative: "этому",
        accusative: {
          animate: "этого",
          inanimate: "этот",
        },
        instrumental: "этим",
        prepositional: "этом",
      },
      feminine: {
        nominative: "эта",
        genitive: "этой",
        dative: "этой",
        accusative: "эту",
        instrumental: "этой",
        prepositional: "этой",
      },
      neuter: {
        nominative: "это",
        genitive: "этого",
        dative: "этому",
        accusative: "это",
        instrumental: "этим",
        prepositional: "этом",
      },
    },
    plural: {
      nominative: "эти",
      genitive: "этих",
      dative: "этим",
      accusative: {
        animate: "этих",
        inanimate: "эти",
      },
      instrumental: "этими",
      prepositional: "этих",
    },
  },
  that: {
    singular: {
      masculine: {
        nominative: "тот",
        genitive: "того",
        dative: "тому",
        accusative: {
          animate: "того",
          inanimate: "тот",
        },
        instrumental: "тем",
        prepositional: "том",
      },
      feminine: {
        nominative: "та",
        genitive: "той",
        dative: "той",
        accusative: "ту",
        instrumental: "той",
        prepositional: "той",
      },
      neuter: {
        nominative: "то",
        genitive: "того",
        dative: "тому",
        accusative: "то",
        instrumental: "тем",
        prepositional: "том",
      },
    },
    plural: {
      nominative: "те",
      genitive: "тех",
      dative: "тем",
      accusative: {
        animate: "тех",
        inanimate: "те",
      },
      instrumental: "теми",
      prepositional: "тех",
    },
  },
}

// Russian interrogative pronouns data
const interrogativePronouns = {
  who: {
    nominative: "кто",
    genitive: "кого",
    dative: "кому",
    accusative: "кого",
    instrumental: "кем",
    prepositional: "ком",
  },
  what: {
    nominative: "что",
    genitive: "чего",
    dative: "чему",
    accusative: "что",
    instrumental: "чем",
    prepositional: "чём",
  },
  which: {
    singular: {
      masculine: {
        nominative: "какой",
        genitive: "какого",
        dative: "какому",
        accusative: {
          animate: "какого",
          inanimate: "какой",
        },
        instrumental: "каким",
        prepositional: "каком",
      },
      feminine: {
        nominative: "какая",
        genitive: "какой",
        dative: "какой",
        accusative: "какую",
        instrumental: "какой",
        prepositional: "какой",
      },
      neuter: {
        nominative: "какое",
        genitive: "какого",
        dative: "какому",
        accusative: "какое",
        instrumental: "каким",
        prepositional: "каком",
      },
    },
    plural: {
      nominative: "какие",
      genitive: "каких",
      dative: "каким",
      accusative: {
        animate: "каких",
        inanimate: "какие",
      },
      instrumental: "какими",
      prepositional: "каких",
    },
  },
  whose: {
    singular: {
      masculine: {
        nominative: "чей",
        genitive: "чьего",
        dative: "чьему",
        accusative: {
          animate: "чьего",
          inanimate: "чей",
        },
        instrumental: "чьим",
        prepositional: "чьём",
      },
      feminine: {
        nominative: "чья",
        genitive: "чьей",
        dative: "чьей",
        accusative: "чью",
        instrumental: "чьей",
        prepositional: "чьей",
      },
      neuter: {
        nominative: "чьё",
        genitive: "чьего",
        dative: "чьему",
        accusative: "чьё",
        instrumental: "чьим",
        prepositional: "чьём",
      },
    },
    plural: {
      nominative: "чьи",
      genitive: "чьих",
      dative: "чьим",
      accusative: {
        animate: "чьих",
        inanimate: "чьи",
      },
      instrumental: "чьими",
      prepositional: "чьих",
    },
  },
}

// Russian negative pronouns data
const negativePronouns = {
  nobody: {
    nominative: "никто",
    genitive: "никого",
    dative: "никому",
    accusative: "никого",
    instrumental: "никем",
    prepositional: "ни о ком",
  },
  nothing: {
    nominative: "ничто",
    genitive: "ничего",
    dative: "ничему",
    accusative: "ничего",
    instrumental: "ничем",
    prepositional: "ни о чём",
  },
  no_one_to: {
    nominative: "-",
    genitive: "некого",
    dative: "некому",
    accusative: "некого",
    instrumental: "некем",
    prepositional: "не о ком",
  },
  nothing_to: {
    nominative: "-",
    genitive: "нечего",
    dative: "нечему",
    accusative: "нечего",
    instrumental: "нечем",
    prepositional: "не о чем",
  },
}

// Russian reflexive pronouns data
const reflexivePronouns = {
  oneself: {
    nominative: "-",
    genitive: "себя",
    dative: "себе",
    accusative: "себя",
    instrumental: "собой",
    prepositional: "себе",
  },
  each_other: {
    nominative: "-",
    genitive: "друг друга",
    dative: "друг другу",
    accusative: "друг друга",
    instrumental: "друг другом",
    prepositional: "друг о друге",
  },
}

// Examples for personal pronouns
const personalPronounExamples = {
  singular: {
    first: {
      nominative: "Я иду домой.",
      genitive: "У меня есть книга.",
      dative: "Дай мне книгу.",
      accusative: "Он видит меня.",
      instrumental: "Он доволен мной.",
      prepositional: "Он говорит обо мне.",
    },
    second: {
      nominative: "Ты идёшь домой.",
      genitive: "У тебя есть книга.",
      dative: "Дай тебе книгу.",
      accusative: "Он видит тебя.",
      instrumental: "Он доволен тобой.",
      prepositional: "Он говорит о тебе.",
    },
    third: {
      masculine: {
        nominative: "Он идёт домой.",
        genitive: "У него есть книга.",
        dative: "Дай ему книгу.",
        accusative: "Она видит его.",
        instrumental: "Она довольна им.",
        prepositional: "Она говорит о нём.",
      },
      feminine: {
        nominative: "Она идёт домой.",
        genitive: "У неё есть книга.",
        dative: "Дай ей книгу.",
        accusative: "Он видит её.",
        instrumental: "Он доволен ей.",
        prepositional: "Он говорит о ней.",
      },
      neuter: {
        nominative: "Оно лежит на столе.",
        genitive: "У него есть особенность.",
        dative: "Дай ему время.",
        accusative: "Я вижу его.",
        instrumental: "Я доволен им.",
        prepositional: "Я говорю о нём.",
      },
    },
  },
  plural: {
    first: {
      nominative: "Мы идём домой.",
      genitive: "У нас есть книги.",
      dative: "Дай нам книги.",
      accusative: "Он видит нас.",
      instrumental: "Он доволен нами.",
      prepositional: "Он говорит о нас.",
    },
    second: {
      nominative: "Вы идёте домой.",
      genitive: "У вас есть книги.",
      dative: "Дай вам книги.",
      accusative: "Он видит вас.",
      instrumental: "Он доволен вами.",
      prepositional: "Он говорит о вас.",
    },
    third: {
      nominative: "Они идут домой.",
      genitive: "У них есть книги.",
      dative: "Дай им книги.",
      accusative: "Он видит их.",
      instrumental: "Он доволен ими.",
      prepositional: "Он говорит о них.",
    },
  },
}

// Examples for possessive pronouns
const possessivePronounExamples: Record<PossessiveType, any> = {
  my: {
    singular: {
      masculine: {
        nominative: "Мой дом красивый.",
        genitive: "Нет моего дома.",
        dative: "Иду к моему дому.",
        accusative: "Вижу мой дом (неодуш.) / моего кота (одуш.).",
        instrumental: "Горжусь моим домом.",
        prepositional: "Думаю о моём доме.",
      },
      feminine: {
        nominative: "Моя книга интересная.",
        genitive: "Нет моей книги.",
        dative: "Иду к моей книге.",
        accusative: "Вижу мою книгу.",
        instrumental: "Пишу моей ручкой.",
        prepositional: "Думаю о моей книге.",
      },
      neuter: {
        nominative: "Моё окно открыто.",
        genitive: "Нет моего окна.",
        dative: "Иду к моему окну.",
        accusative: "Вижу моё окно.",
        instrumental: "Смотрю через моё окно.",
        prepositional: "Думаю о моём окне.",
      },
    },
    plural: {
      nominative: "Мои друзья здесь.",
      genitive: "Нет моих друзей.",
      dative: "Иду к моим друзьям.",
      accusative: "Вижу моих друзей (одуш.) / мои книги (неодуш.).",
      instrumental: "Общаюсь с моими друзьями.",
      prepositional: "Думаю о моих друзьях.",
    },
  },
  your: {
    singular: {
      masculine: {
        nominative: "Твой телефон звонит.",
        genitive: "Нет твоего телефона.",
        dative: "Иду к твоему телефону.",
        accusative: "Вижу твой телефон (неодуш.) / твоего кота (одуш.).",
        instrumental: "Пользуюсь твоим телефоном.",
        prepositional: "Думаю о твоём телефоне.",
      },
      feminine: {
        nominative: "Твоя сумка тяжёлая.",
        genitive: "Нет твоей сумки.",
        dative: "Иду к твоей сумке.",
        accusative: "Вижу твою сумку.",
        instrumental: "Несу твоей сумкой.",
        prepositional: "Думаю о твоей сумке.",
      },
      neuter: {
        nominative: "Твоё письмо пришло.",
        genitive: "Нет твоего письма.",
        dative: "Иду к твоему письму.",
        accusative: "Вижу твоё письмо.",
        instrumental: "Пишу твоим пером.",
        prepositional: "Думаю о твоём письме.",
      },
    },
    plural: {
      nominative: "Твои идеи интересные.",
      genitive: "Нет твоих идей.",
      dative: "Иду к твоим идеям.",
      accusative: "Вижу твоих коллег (одуш.) / твои идеи (неодуш.).",
      instrumental: "Вдохновляюсь твоими идеями.",
      prepositional: "Думаю о твоих идеях.",
    },
  },
  our: {
    singular: {
      masculine: {
        nominative: "Наш город прекрасен.",
        genitive: "Нет нашего города.",
        dative: "Иду к нашему городу.",
        accusative: "Вижу наш город (неодуш.) / нашего соседа (одуш.).",
        instrumental: "Горжусь нашим городом.",
        prepositional: "Думаю о нашем городе.",
      },
      feminine: {
        nominative: "Наша команда сильная.",
        genitive: "Нет нашей команды.",
        dative: "Иду к нашей команде.",
        accusative: "Вижу нашу команду.",
        instrumental: "Работаю с нашей командой.",
        prepositional: "Думаю о нашей команде.",
      },
      neuter: {
        nominative: "Наше решение правильное.",
        genitive: "Нет нашего решения.",
        dative: "Иду к нашему решению.",
        accusative: "Вижу наше решение.",
        instrumental: "Доволен нашим решением.",
        prepositional: "Думаю о нашем решении.",
      },
    },
    plural: {
      nominative: "Наши дети учатся.",
      genitive: "Нет наших детей.",
      dative: "Иду к нашим детям.",
      accusative: "Вижу наших детей (одуш.) / наши книги (неодуш.).",
      instrumental: "Горжусь нашими детьми.",
      prepositional: "Думаю о наших детях.",
    },
  },
  your_plural: {
    singular: {
      masculine: {
        nominative: "Ваш документ готов.",
        genitive: "Нет вашего документа.",
        dative: "Иду к вашему документу.",
        accusative: "Вижу ваш документ (неодуш.) / вашего сотрудника (одуш.).",
        instrumental: "Подписываю вашим документом.",
        prepositional: "Думаю о вашем документе.",
      },
      feminine: {
        nominative: "Ваша машина новая.",
        genitive: "Нет вашей машины.",
        dative: "Иду к вашей машине.",
        accusative: "Вижу вашу машину.",
        instrumental: "Еду вашей машиной.",
        prepositional: "Думаю о вашей машине.",
      },
      neuter: {
        nominative: "Ваше предложение принято.",
        genitive: "Нет вашего предложения.",
        dative: "Иду к вашему предложению.",
        accusative: "Вижу ваше предложение.",
        instrumental: "Доволен вашим предложением.",
        prepositional: "Думаю о вашем предложении.",
      },
    },
    plural: {
      nominative: "Ваши друзья добрые.",
      genitive: "Нет ваших друзей.",
      dative: "Иду к вашим друзьям.",
      accusative: "Вижу ваших друзей (одуш.) / ваши идеи (неодуш.).",
      instrumental: "Общаюсь с вашими друзьями.",
      prepositional: "Думаю о ваших друзьях.",
    },
  },
  reflexive: {
    singular: {
      masculine: {
        nominative: "Сын взял свой рюкзак.",
        genitive: "Нет своего рюкзака.",
        dative: "Иду к своему рюкзаку.",
        accusative: "Вижу свой рюкзак (неодуш.) / своего друга (одуш.).",
        instrumental: "Пользуюсь своим рюкзаком.",
        prepositional: "Думаю о своём рюкзаке.",
      },
      feminine: {
        nominative: "Дочь взяла свою сумку.",
        genitive: "Нет своей сумки.",
        dative: "Иду к своей сумке.",
        accusative: "Вижу свою сумку.",
        instrumental: "Пользуюсь своей сумкой.",
        prepositional: "Думаю о своей сумке.",
      },
      neuter: {
        nominative: "Солнце скрыло своё лицо.",
        genitive: "Нет своего места.",
        dative: "Иду к своему месту.",
        accusative: "Вижу своё место.",
        instrumental: "Доволен своим местом.",
        prepositional: "Думаю о своём месте.",
      },
    },
    plural: {
      nominative: "Дети взяли свои вещи.",
      genitive: "Нет своих вещей.",
      dative: "Иду к своим вещам.",
      accusative: "Вижу своих друзей (одуш.) / свои вещи (неодуш.).",
      instrumental: "Доволен своими вещами.",
      prepositional: "Думаю о своих вещах.",
    },
  },
  his: {
    singular: {
      masculine: {
        nominative: "Это его книга. (Не изменяется)",
        genitive: "Это его книга. (Не изменяется)",
        dative: "Это его книга. (Не изменяется)",
        accusative: "Это его книга. (Не изменяется)",
        instrumental: "Это его книга. (Не изменяется)",
        prepositional: "Это его книга. (Не изменяется)",
      },
      feminine: {
        nominative: "Это его книга. (Не изменяется)",
        genitive: "Это его книга. (Не изменяется)",
        dative: "Это его книга. (Не изменяется)",
        accusative: "Это его книга. (Не изменяется)",
        instrumental: "Это его книга. (Не изменяется)",
        prepositional: "Это его книга. (Не изменяется)",
      },
      neuter: {
        nominative: "Это его книга. (Не изменяется)",
        genitive: "Это его книга. (Не изменяется)",
        dative: "Это его книга. (Не изменяется)",
        accusative: "Это его книга. (Не изменяется)",
        instrumental: "Это его книга. (Не изменяется)",
        prepositional: "Это его книга. (Не изменяется)",
      },
    },
    plural: {
      nominative: "Это его книга. (Не изменяется)",
      genitive: "Это его книга. (Не изменяется)",
      dative: "Это его книга. (Не изменяется)",
      accusative: "Это его книга. (Не изменяется)",
      instrumental: "Это его книга. (Не изменяется)",
      prepositional: "Это его книга. (Не изменяется)",
    },
    all: "Это его книга. (Не изменяется)",
  },
  her: {
    singular: {
      masculine: {
        nominative: "Это её книга. (Не изменяется)",
        genitive: "Это её книга. (Не изменяется)",
        dative: "Это её книга. (Не изменяется)",
        accusative: "Это её книга. (Не изменяется)",
        instrumental: "Это её книга. (Не изменяется)",
        prepositional: "Это её книга. (Не изменяется)",
      },
      feminine: {
        nominative: "Это её книга. (Не изменяется)",
        genitive: "Это её книга. (Не изменяется)",
        dative: "Это её книга. (Не изменяется)",
        accusative: "Это её книга. (Не изменяется)",
        instrumental: "Это её книга. (Не изменяется)",
        prepositional: "Это её книга. (Не изменяется)",
      },
      neuter: {
        nominative: "Это её книга. (Не изменяется)",
        genitive: "Это её книга. (Не изменяется)",
        dative: "Это её книга. (Не изменяется)",
        accusative: "Это её книга. (Не изменяется)",
        instrumental: "Это её книга. (Не изменяется)",
        prepositional: "Это её книга. (Не изменяется)",
      },
    },
    plural: {
      nominative: "Это её книга. (Не изменяется)",
      genitive: "Это её книга. (Не изменяется)",
      dative: "Это её книга. (Не изменяется)",
      accusative: "Это её книга. (Не изменяется)",
      instrumental: "Это её книга. (Не изменяется)",
      prepositional: "Это её книга. (Не изменяется)",
    },
    all: "Это её книга. (Не изменяется)",
  },
  their: {
    singular: {
      masculine: {
        nominative: "Это их книга. (Не изменяется)",
        genitive: "Это их книга. (Не изменяется)",
        dative: "Это их книга. (Не изменяется)",
        accusative: "Это их книга. (Не изменяется)",
        instrumental: "Это их книга. (Не изменяется)",
        prepositional: "Это их книга. (Не изменяется)",
      },
      feminine: {
        nominative: "Это их книга. (Не изменяется)",
        genitive: "Это их книга. (Не изменяется)",
        dative: "Это их книга. (Не изменяется)",
        accusative: "Это их книга. (Не изменяется)",
        instrumental: "Это их книга. (Не изменяется)",
        prepositional: "Это их книга. (Не изменяется)",
      },
      neuter: {
        nominative: "Это их книга. (Не изменяется)",
        genitive: "Это их книга. (Не изменяется)",
        dative: "Это их книга. (Не изменяется)",
        accusative: "Это их книга. (Не изменяется)",
        instrumental: "Это их книга. (Не изменяется)",
        prepositional: "Это их книга. (Не изменяется)",
      },
    },
    plural: {
      nominative: "Это их книга. (Не изменяется)",
      genitive: "Это их книга. (Не изменяется)",
      dative: "Это их книга. (Не изменяется)",
      accusative: "Это их книга. (Не изменяется)",
      instrumental: "Это их книга. (Не изменяется)",
      prepositional: "Это их книга. (Не изменяется)",
    },
    all: "Это их книга. (Не изменяется)",
  },
}

// Examples for demonstrative pronouns
const demonstrativePronounExamples = {
  this: {
    singular: {
      masculine: {
        nominative: "Этот человек добрый.",
        genitive: "Нет этого человека.",
        dative: "Иду к этому человеку.",
        accusative: "Вижу этот дом (неодуш.) / этого человека (одуш.).",
        instrumental: "Разговариваю с этим человеком.",
        prepositional: "Думаю об этом человеке.",
      },
      feminine: {
        nominative: "Эта книга интересная.",
        genitive: "Нет этой книги.",
        dative: "Иду к этой книге.",
        accusative: "Вижу эту книгу.",
        instrumental: "Пользуюсь этой книгой.",
        prepositional: "Думаю об этой книге.",
      },
      neuter: {
        nominative: "Это окно открыто.",
        genitive: "Нет этого окна.",
        dative: "Иду к этому окну.",
        accusative: "Вижу это окно.",
        instrumental: "Смотрю через это окно.",
        prepositional: "Думаю об этом окне.",
      },
    },
    plural: {
      nominative: "Эти люди добрые.",
      genitive: "Нет этих людей.",
      dative: "Иду к этим людям.",
      accusative: "Вижу этих людей (одуш.) / эти дома (неодуш.).",
      instrumental: "Общаюсь с этими людьми.",
      prepositional: "Думаю об этих людях.",
    },
  },
  that: {
    singular: {
      masculine: {
        nominative: "Тот дом далёкий.",
        genitive: "Нет того дома.",
        dative: "Иду к тому дому.",
        accusative: "Вижу тот дом (неодуш.) / того человека (одуш.).",
        instrumental: "Любуюсь тем домом.",
        prepositional: "Думаю о том доме.",
      },
      feminine: {
        nominative: "Та гора высокая.",
        genitive: "Нет той горы.",
        dative: "Иду к той горе.",
        accusative: "Вижу ту гору.",
        instrumental: "Восхищаюсь той горой.",
        prepositional: "Думаю о той горе.",
      },
      neuter: {
        nominative: "То здание старое.",
        genitive: "Нет того здания.",
        dative: "Иду к тому зданию.",
        accusative: "Вижу то здание.",
        instrumental: "Интересуюсь тем зданием.",
        prepositional: "Думаю о том здании.",
      },
    },
    plural: {
      nominative: "Те деревья высокие.",
      genitive: "Нет тех деревьев.",
      dative: "Иду к тем деревьям.",
      accusative: "Вижу тех птиц (одуш.) / те деревья (неодуш.).",
      instrumental: "Любуюсь теми деревьями.",
      prepositional: "Думаю о тех деревьях.",
    },
  },
}

// Examples for interrogative pronouns
const interrogativePronounExamples = {
  who: {
    nominative: "Кто это?",
    genitive: "У кого это?",
    dative: "Кому это дать?",
    accusative: "Кого вы видите?",
    instrumental: "С кем вы говорили?",
    prepositional: "О ком вы думаете?",
  },
  what: {
    nominative: "Что это?",
    genitive: "Чего ты боишься?",
    dative: "Чему ты учишься?",
    accusative: "Что ты видишь?",
    instrumental: "Чем ты пишешь?",
    prepositional: "О чём ты мечтаешь?",
  },
  which: {
    singular: {
      masculine: {
        nominative: "Какой фильм смотреть?",
        genitive: "Какого фильма не хватает?",
        dative: "Какому фильму отдать предпочтение?",
        accusative: "Какой фильм выбрать (неодуш.) / Какого актёра пригласить (одуш.)?",
        instrumental: "С каким фильмом сравнивать?",
        prepositional: "О каком фильме речь?",
      },
      feminine: {
        nominative: "Какая книга интересная?",
        genitive: "Какой книги не хватает?",
        dative: "Какой книге отдать предпочтение?",
        accusative: "Какую книгу выбрать?",
        instrumental: "С какой книгой сравнивать?",
        prepositional: "О какой книге речь?",
      },
      neuter: {
        nominative: "Какое решение правильное?",
        genitive: "Какого решения не хватает?",
        dative: "Какому решению следовать?",
        accusative: "Какое решение принять?",
        instrumental: "С каким решением согласиться?",
        prepositional: "О каком решении речь?",
      },
    },
    plural: {
      nominative: "Какие цветы красивые?",
      genitive: "Каких цветов не хватает?",
      dative: "Каким цветам нужно больше света?",
      accusative: "Какие цветы выбрать (неодуш.) / Каких садовников пригласить (одуш.)?",
      instrumental: "С какими цветами сочетать?",
      prepositional: "О каких цветах речь?",
    },
  },
  whose: {
    singular: {
      masculine: {
        nominative: "Чей это дом?",
        genitive: "Чьего дома не хватает?",
        dative: "Чьему дому нужен ремонт?",
        accusative: "Чей дом видно (неодуш.) / Чьего кота видно (одуш.)?",
        instrumental: "С чьим домом сравнивать?",
        prepositional: "О чьём доме речь?",
      },
      feminine: {
        nominative: "Чья это книга?",
        genitive: "Чьей книги не хватает?",
        dative: "Чьей книге нужна обложка?",
        accusative: "Чью книгу взять?",
        instrumental: "С чьей книгой работать?",
        prepositional: "О чьей книге речь?",
      },
      neuter: {
        nominative: "Чьё это окно?",
        genitive: "Чьего окна не хватает?",
        dative: "Чьему окну нужна замена?",
        accusative: "Чьё окно ремонтировать?",
        instrumental: "С чьим окном сравнивать?",
        prepositional: "О чьём окне речь?",
      },
    },
    plural: {
      nominative: "Чьи это вещи?",
      genitive: "Чьих вещей не хватает?",
      dative: "Чьим вещам нужен уход?",
      accusative: "Чьи вещи убрать (неодуш.) / Чьих сотрудников наградить (одуш.)?",
      instrumental: "С чьими вещами работать?",
      prepositional: "О чьих вещах речь?",
    },
  },
}

// Examples for negative pronouns
const negativePronounExamples = {
  nobody: {
    nominative: "Никто не пришёл.",
    genitive: "Нет никого дома.",
    dative: "Некому помочь.",
    accusative: "Я никого не вижу.",
    instrumental: "Это не сделано никем.",
    prepositional: "Не о ком беспокоиться.",
  },
  nothing: {
    nominative: "Ничто не вечно.",
    genitive: "Нет ничего важнее.",
    dative: "Нечему удивляться.",
    accusative: "Я ничего не знаю.",
    instrumental: "Этим ничего не изменишь.",
    prepositional: "Не о чем говорить.",
  },
  no_one_to: {
    nominative: "-",
    genitive: "Некого винить.",
    dative: "Не к кому обратиться.",
    accusative: "Мне некого ждать.",
    instrumental: "Не с кем посоветоваться.",
    prepositional: "Не о ком думать.",
  },
  nothing_to: {
    nominative: "-",
    genitive: "Нечего бояться.",
    dative: "Нечему учиться.",
    accusative: "Мне нечего сказать.",
    instrumental: "Нечем писать.",
    prepositional: "Не о чем спорить.",
  },
}

// Examples for reflexive pronouns
const reflexivePronounExamples = {
  oneself: {
    nominative: "-",
    genitive: "Думаю только о себе.",
    dative: "Купил себе книгу.",
    accusative: "Вижу себя в зеркале.",
    instrumental: "Доволен собой.",
    prepositional: "Думаю о себе.",
  },
  each_other: {
    nominative: "-",
    genitive: "Они думают друг о друге.",
    dative: "Они пишут друг другу.",
    accusative: "Они видят друг друга.",
    instrumental: "Они довольны друг другом.",
    prepositional: "Они говорят друг о друге.",
  },
}

// Translations for case names
const caseTranslations = {
  nominative: "Именительный",
  genitive: "Родительный",
  dative: "Дательный",
  accusative: "Винительный",
  instrumental: "Творительный",
  prepositional: "Предложный",
}

// Translations for pronoun types
const pronounTypeTranslations = {
  personal: "Личные",
  possessive: "Притяжательные",
  demonstrative: "Указательные",
  interrogative: "Вопросительные",
  negative: "Отрицательные",
  reflexive: "Возвратные",
}

// Component for the pronoun explorer
export default function PronounExplorer() {
  // Main state
  const [pronounType, setPronounType] = useState<PronounType>("personal")
  const [showExamples, setShowExamples] = useState(true)
  const [hiddenEndings, setHiddenEndings] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [testMode, setTestMode] = useState(false)

  // For personal pronouns
  const [personNumber, setPersonNumber] = useState<PersonNumber>("singular")
  const [person, setPerson] = useState<Person>("first")
  const [thirdPersonGender, setThirdPersonGender] = useState<Gender>("masculine")

  // For possessive pronouns
  const [possessiveType, setPossessiveType] = useState<PossessiveType>("my")
  const [possessiveNumber, setPossessiveNumber] = useState<PersonNumber>("singular")
  const [possessiveGender, setPossessiveGender] = useState<Gender>("masculine")

  // For demonstrative pronouns
  const [demonstrativeType, setDemonstrativeType] = useState<DemonstrativeType>("this")
  const [demonstrativeNumber, setDemonstrativeNumber] = useState<PersonNumber>("singular")
  const [demonstrativeGender, setDemonstrativeGender] = useState<Gender>("masculine")

  // For interrogative pronouns
  const [interrogativeType, setInterrogativeType] = useState<InterrogativeType>("who")
  const [interrogativeNumber, setInterrogativeNumber] = useState<PersonNumber>("singular")
  const [interrogativeGender, setInterrogativeGender] = useState<Gender>("masculine")

  // For negative pronouns
  const [negativeType, setNegativeType] = useState<NegativeType>("nobody")

  // For reflexive pronouns
  const [reflexiveType, setReflexiveType] = useState<ReflexiveType>("oneself")

  const cases: Case[] = ["nominative", "genitive", "dative", "accusative", "instrumental", "prepositional"]

  // Toggle visibility of endings for test mode
  const toggleEndingVisibility = (caseType: string, type = "default") => {
    const key = `${caseType}_${type}`

    setHiddenEndings((prev) => {
      if (prev[key]) {
        const newState = { ...prev }
        delete newState[key]
        return newState
      } else {
        return {
          ...prev,
          [key]: true,
        }
      }
    })
  }

  // Toggle test mode
  const toggleTestMode = () => {
    if (!testMode) {
      // Hide all endings
      const allHidden: Record<string, boolean> = {}
      cases.forEach((caseType) => {
        allHidden[`${caseType}_personal`] = true
        allHidden[`${caseType}_possessive`] = true
        allHidden[`${caseType}_demonstrative`] = true
        allHidden[`${caseType}_interrogative`] = true
        allHidden[`${caseType}_negative`] = true
        allHidden[`${caseType}_reflexive`] = true
      })
      setHiddenEndings(allHidden)
    } else {
      // Show all endings
      setHiddenEndings({})
    }
    setTestMode(!testMode)
  }

  // Render the personal pronoun table
  const renderPersonalPronounTable = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quantity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={personNumber === "singular" ? "default" : "outline"}
                  onClick={() => setPersonNumber("singular")}
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Singular
                </Button>
                <Button
                  variant={personNumber === "plural" ? "default" : "outline"}
                  onClick={() => setPersonNumber("plural")}
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Plural
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Person</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={person === "first" ? "default" : "outline"}
                  onClick={() => setPerson("first")}
                  size="sm"
                >
                  1st Person (я/мы)
                </Button>
                <Button
                  variant={person === "second" ? "default" : "outline"}
                  onClick={() => setPerson("second")}
                  size="sm"
                >
                  2nd Person (ты/вы)
                </Button>
                <Button
                  variant={person === "third" ? "default" : "outline"}
                  onClick={() => setPerson("third")}
                  size="sm"
                >
                  3rd Person (он/она/оно/они)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {personNumber === "singular" && person === "third" && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Gender</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={thirdPersonGender === "masculine" ? "default" : "outline"}
                  onClick={() => setThirdPersonGender("masculine")}
                  size="sm"
                >
                  Masculine (он)
                </Button>
                <Button
                  variant={thirdPersonGender === "feminine" ? "default" : "outline"}
                  onClick={() => setThirdPersonGender("feminine")}
                  size="sm"
                >
                  Feminine (она)
                </Button>
                <Button
                  variant={thirdPersonGender === "neuter" ? "default" : "outline"}
                  onClick={() => setThirdPersonGender("neuter")}
                  size="sm"
                >
                  Neuter (оно)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              {personNumber === "singular"
                ? person === "first"
                  ? "Я (I)"
                  : person === "second"
                    ? "Ты (You)"
                    : thirdPersonGender === "masculine"
                      ? "Он (He)"
                      : thirdPersonGender === "feminine"
                        ? "Она (She)"
                        : "Оно (It)"
                : person === "first"
                  ? "Мы (We)"
                  : person === "second"
                    ? "Вы (You)"
                    : "Они (They)"}
            </CardTitle>
            <CardDescription>
              {personNumber === "singular" ? "Singular" : "Plural"}{" "}
              {person === "first" ? "1st" : person === "second" ? "2nd" : "3rd"} person
              {personNumber === "singular" && person === "third"
                ? `, ${thirdPersonGender === "masculine" ? "masculine" : thirdPersonGender === "feminine" ? "feminine" : "neuter"}`
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Pronoun</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    let pronoun
                    let example

                    if (personNumber === "singular") {
                      if (person === "third") {
                        pronoun = personalPronouns.singular.third[thirdPersonGender][caseType]
                        example = personalPronounExamples.singular.third[thirdPersonGender][caseType]
                      } else {
                        pronoun = personalPronouns.singular[person][caseType]
                        example = personalPronounExamples.singular[person][caseType]
                      }
                    } else {
                      pronoun = personalPronouns.plural[person][caseType]
                      example = personalPronounExamples.plural[person][caseType]
                    }

                    const key = `${caseType}_personal`
                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "personal")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : (
                            <div className="font-medium text-lg">{pronoun}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>{!hiddenEndings[key] && <div className="text-sm">{example}</div>}</TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render the possessive pronoun table
  const renderPossessivePronounTable = () => {
    const possessiveLabels: Record<PossessiveType, string> = {
      my: "Мой (My)",
      your: "Твой (Your)",
      our: "Наш (Our)",
      your_plural: "Ваш (Your pl.)",
      reflexive: "Свой (One's own)",
      his: "Его (His)",
      her: "Её (Her)",
      their: "Их (Their)",
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Possessive Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant={possessiveType === "my" ? "default" : "outline"}
                onClick={() => setPossessiveType("my")}
                size="sm"
                className="justify-start"
              >
                Мой (My)
              </Button>
              <Button
                variant={possessiveType === "your" ? "default" : "outline"}
                onClick={() => setPossessiveType("your")}
                size="sm"
                className="justify-start"
              >
                Твой (Your)
              </Button>
              <Button
                variant={possessiveType === "our" ? "default" : "outline"}
                onClick={() => setPossessiveType("our")}
                size="sm"
                className="justify-start"
              >
                Наш (Our)
              </Button>
              <Button
                variant={possessiveType === "your_plural" ? "default" : "outline"}
                onClick={() => setPossessiveType("your_plural")}
                size="sm"
                className="justify-start"
              >
                Ваш (Your pl.)
              </Button>
              <Button
                variant={possessiveType === "reflexive" ? "default" : "outline"}
                onClick={() => setPossessiveType("reflexive")}
                size="sm"
                className="justify-start"
              >
                Свой (One's own)
              </Button>
              <Button
                variant={possessiveType === "his" ? "default" : "outline"}
                onClick={() => setPossessiveType("his")}
                size="sm"
                className="justify-start"
              >
                Его (His)
              </Button>
              <Button
                variant={possessiveType === "her" ? "default" : "outline"}
                onClick={() => setPossessiveType("her")}
                size="sm"
                className="justify-start"
              >
                Её (Her)
              </Button>
              <Button
                variant={possessiveType === "their" ? "default" : "outline"}
                onClick={() => setPossessiveType("their")}
                size="sm"
                className="justify-start"
              >
                Их (Their)
              </Button>
            </div>
          </CardContent>
        </Card>

        {possessiveType === "his" || possessiveType === "her" || possessiveType === "their" ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {possessiveType === "his" ? "Его (His)" : possessiveType === "her" ? "Её (Her)" : "Их (Their)"}
              </CardTitle>
              <CardDescription>
                This possessive pronoun is invariable and does not change for case, gender, or quantity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md bg-muted/50">
                <p className="text-center text-lg font-medium">
                  <strong>{possessiveType === "his" ? "его" : possessiveType === "her" ? "её" : "их"}</strong>
                </p>
                <p className="text-center mt-2">
                  Example:{" "}
                  {possessiveType === "his"
                    ? "Это его книга."
                    : possessiveType === "her"
                      ? "Это её книга."
                      : "Это их книга."}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quantity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={possessiveNumber === "singular" ? "default" : "outline"}
                      onClick={() => setPossessiveNumber("singular")}
                      size="sm"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Singular
                    </Button>
                    <Button
                      variant={possessiveNumber === "plural" ? "default" : "outline"}
                      onClick={() => setPossessiveNumber("plural")}
                      size="sm"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Plural
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {possessiveNumber === "singular" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Gender</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={possessiveGender === "masculine" ? "default" : "outline"}
                        onClick={() => setPossessiveGender("masculine")}
                        size="sm"
                      >
                        Masculine
                      </Button>
                      <Button
                        variant={possessiveGender === "feminine" ? "default" : "outline"}
                        onClick={() => setPossessiveGender("feminine")}
                        size="sm"
                      >
                        Feminine
                      </Button>
                      <Button
                        variant={possessiveGender === "neuter" ? "default" : "outline"}
                        onClick={() => setPossessiveGender("neuter")}
                        size="sm"
                      >
                        Neuter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {possessiveLabels[possessiveType]}{" "}
                  {possessiveNumber === "singular"
                    ? possessiveGender === "masculine"
                      ? "(Masculine)"
                      : possessiveGender === "feminine"
                        ? "(Feminine)"
                        : "(Neuter)"
                    : "(Plural)"}
                </CardTitle>
                <CardDescription>
                  {possessiveNumber === "singular" ? "Singular" : "Plural"}{" "}
                  {possessiveNumber === "singular"
                    ? possessiveGender === "masculine"
                      ? "masculine"
                      : possessiveGender === "feminine"
                        ? "feminine"
                        : "neuter"
                    : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Case</TableHead>
                        <TableHead>Pronoun</TableHead>
                        {showExamples && <TableHead>Example</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cases.map((caseType) => {
                        let pronoun
                        let example

                        if (possessiveNumber === "singular") {
                          if (caseType === "accusative" && possessiveGender === "masculine") {
                            pronoun = {
                              animate: possessivePronouns[possessiveType].singular[possessiveGender].accusative.animate,
                              inanimate:
                                possessivePronouns[possessiveType].singular[possessiveGender].accusative.inanimate,
                            }
                          } else {
                            pronoun = possessivePronouns[possessiveType].singular[possessiveGender][caseType]
                          }
                          example = possessivePronounExamples[possessiveType].singular[possessiveGender][caseType]
                        } else {
                          if (caseType === "accusative") {
                            pronoun = {
                              animate: possessivePronouns[possessiveType].plural.accusative.animate,
                              inanimate: possessivePronouns[possessiveType].plural.accusative.inanimate,
                            }
                          } else {
                            pronoun = possessivePronouns[possessiveType].plural[caseType]
                          }
                          example = possessivePronounExamples[possessiveType].plural[caseType]
                        }

                        const key = `${caseType}_possessive`
                        return (
                          <TableRow key={caseType}>
                            <TableCell className="font-medium">
                              {caseTranslations[caseType]}
                              <div className="text-xs text-muted-foreground">{caseType}</div>
                            </TableCell>
                            <TableCell
                              onClick={() => toggleEndingVisibility(caseType, "possessive")}
                              className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                            >
                              {hiddenEndings[key] ? (
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  <Eye size={14} className="mr-1" /> Show
                                </Button>
                              ) : caseType === "accusative" && typeof pronoun !== "string" ? (
                                <>
                                  <div>
                                    <div className="text-sm font-medium">Inanimate:</div>
                                    <div className="font-medium text-lg">{(pronoun as AccusativeForm).inanimate}</div>
                                  </div>
                                  <div className="mt-2">
                                    <div className="text-sm font-medium">Animate:</div>
                                    <div className="font-medium text-lg">{(pronoun as AccusativeForm).animate}</div>
                                  </div>
                                </>
                              ) : (
                                <div className="font-medium text-lg">{pronoun as string}</div>
                              )}
                            </TableCell>
                            {showExamples && (
                              <TableCell>{!hiddenEndings[key] && <div className="text-sm">{example}</div>}</TableCell>
                            )}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    )
  }

  // Render the demonstrative pronoun table
  const renderDemonstrativePronounTable = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={demonstrativeType === "this" ? "default" : "outline"}
                  onClick={() => setDemonstrativeType("this")}
                  size="sm"
                >
                  Этот (This)
                </Button>
                <Button
                  variant={demonstrativeType === "that" ? "default" : "outline"}
                  onClick={() => setDemonstrativeType("that")}
                  size="sm"
                >
                  Тот (That)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quantity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={demonstrativeNumber === "singular" ? "default" : "outline"}
                  onClick={() => setDemonstrativeNumber("singular")}
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Singular
                </Button>
                <Button
                  variant={demonstrativeNumber === "plural" ? "default" : "outline"}
                  onClick={() => setDemonstrativeNumber("plural")}
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Plural
                </Button>
              </div>
            </CardContent>
          </Card>

          {demonstrativeNumber === "singular" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Gender</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={demonstrativeGender === "masculine" ? "default" : "outline"}
                    onClick={() => setDemonstrativeGender("masculine")}
                    size="sm"
                  >
                    Masculine
                  </Button>
                  <Button
                    variant={demonstrativeGender === "feminine" ? "default" : "outline"}
                    onClick={() => setDemonstrativeGender("feminine")}
                    size="sm"
                  >
                    Feminine
                  </Button>
                  <Button
                    variant={demonstrativeGender === "neuter" ? "default" : "outline"}
                    onClick={() => setDemonstrativeGender("neuter")}
                    size="sm"
                  >
                    Neuter
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {demonstrativeType === "this" ? "Этот (This)" : "Тот (That)"}{" "}
              {demonstrativeNumber === "singular"
                ? demonstrativeGender === "masculine"
                  ? "(Masculine)"
                  : demonstrativeGender === "feminine"
                    ? "(Feminine)"
                    : "(Neuter)"
                : "(Plural)"}
            </CardTitle>
            <CardDescription>
              {demonstrativeNumber === "singular" ? "Singular" : "Plural"}{" "}
              {demonstrativeNumber === "singular"
                ? demonstrativeGender === "masculine"
                  ? "masculine"
                  : demonstrativeGender === "feminine"
                    ? "feminine"
                    : "neuter"
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Pronoun</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    let pronoun
                    let example

                    if (demonstrativeNumber === "singular") {
                      if (caseType === "accusative" && demonstrativeGender === "masculine") {
                        pronoun = {
                          animate:
                            demonstrativePronouns[demonstrativeType].singular[demonstrativeGender].accusative.animate,
                          inanimate:
                            demonstrativePronouns[demonstrativeType].singular[demonstrativeGender].accusative.inanimate,
                        }
                      } else {
                        pronoun = demonstrativePronouns[demonstrativeType].singular[demonstrativeGender][caseType]
                      }
                      example = demonstrativePronounExamples[demonstrativeType].singular[demonstrativeGender][caseType]
                    } else {
                      if (caseType === "accusative") {
                        pronoun = {
                          animate: demonstrativePronouns[demonstrativeType].plural.accusative.animate,
                          inanimate: demonstrativePronouns[demonstrativeType].plural.accusative.inanimate,
                        }
                      } else {
                        pronoun = demonstrativePronouns[demonstrativeType].plural[caseType]
                      }
                      example = demonstrativePronounExamples[demonstrativeType].plural[caseType]
                    }

                    const key = `${caseType}_demonstrative`
                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "demonstrative")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : caseType === "accusative" && typeof pronoun !== "string" ? (
                            <>
                              <div>
                                <div className="text-sm font-medium">Inanimate:</div>
                                <div className="font-medium text-lg">{(pronoun as AccusativeForm).inanimate}</div>
                              </div>
                              <div className="mt-2">
                                <div className="text-sm font-medium">Animate:</div>
                                <div className="font-medium text-lg">{(pronoun as AccusativeForm).animate}</div>
                              </div>
                            </>
                          ) : (
                            <div className="font-medium text-lg">{pronoun as string}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>{!hiddenEndings[key] && <div className="text-sm">{example}</div>}</TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render the interrogative pronoun table
  const renderInterrogativePronounTable = () => {
    const interrogativeLabels: Record<InterrogativeType, string> = {
      who: "Кто (Who)",
      what: "Что (What)",
      which: "Какой (Which)",
      whose: "Чей (Whose)",
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant={interrogativeType === "who" ? "default" : "outline"}
                onClick={() => setInterrogativeType("who")}
                size="sm"
              >
                Кто (Who)
              </Button>
              <Button
                variant={interrogativeType === "what" ? "default" : "outline"}
                onClick={() => setInterrogativeType("what")}
                size="sm"
              >
                Что (What)
              </Button>
              <Button
                variant={interrogativeType === "which" ? "default" : "outline"}
                onClick={() => setInterrogativeType("which")}
                size="sm"
              >
                Какой (Which)
              </Button>
              <Button
                variant={interrogativeType === "whose" ? "default" : "outline"}
                onClick={() => setInterrogativeType("whose")}
                size="sm"
              >
                Чей (Whose)
              </Button>
            </div>
          </CardContent>
        </Card>

        {(interrogativeType === "which" || interrogativeType === "whose") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={interrogativeNumber === "singular" ? "default" : "outline"}
                    onClick={() => setInterrogativeNumber("singular")}
                    size="sm"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Singular
                  </Button>
                  <Button
                    variant={interrogativeNumber === "plural" ? "default" : "outline"}
                    onClick={() => setInterrogativeNumber("plural")}
                    size="sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Plural
                  </Button>
                </div>
              </CardContent>
            </Card>

            {interrogativeNumber === "singular" && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Gender</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={interrogativeGender === "masculine" ? "default" : "outline"}
                      onClick={() => setInterrogativeGender("masculine")}
                      size="sm"
                    >
                      Masculine
                    </Button>
                    <Button
                      variant={interrogativeGender === "feminine" ? "default" : "outline"}
                      onClick={() => setInterrogativeGender("feminine")}
                      size="sm"
                    >
                      Feminine
                    </Button>
                    <Button
                      variant={interrogativeGender === "neuter" ? "default" : "outline"}
                      onClick={() => setInterrogativeGender("neuter")}
                      size="sm"
                    >
                      Neuter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              {interrogativeLabels[interrogativeType]}{" "}
              {(interrogativeType === "which" || interrogativeType === "whose") && (
                <>
                  {interrogativeNumber === "singular"
                    ? interrogativeGender === "masculine"
                      ? "(Masculine)"
                      : interrogativeGender === "feminine"
                        ? "(Feminine)"
                        : "(Neuter)"
                    : "(Plural)"}
                </>
              )}
            </CardTitle>
            <CardDescription>
              {(interrogativeType === "which" || interrogativeType === "whose") && (
                <>
                  {interrogativeNumber === "singular" ? "Singular" : "Plural"}{" "}
                  {interrogativeNumber === "singular"
                    ? interrogativeGender === "masculine"
                      ? "masculine"
                      : interrogativeGender === "feminine"
                        ? "feminine"
                        : "neuter"
                    : ""}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Pronoun</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    let pronoun
                    let example

                    if (interrogativeType === "who" || interrogativeType === "what") {
                      pronoun = interrogativePronouns[interrogativeType][caseType]
                      example = interrogativePronounExamples[interrogativeType][caseType]
                    } else {
                      if (interrogativeNumber === "singular") {
                        if (caseType === "accusative" && interrogativeGender === "masculine") {
                          pronoun = {
                            animate:
                              interrogativePronouns[interrogativeType].singular[interrogativeGender].accusative.animate,
                            inanimate:
                              interrogativePronouns[interrogativeType].singular[interrogativeGender].accusative
                                .inanimate,
                          }
                        } else {
                          pronoun = interrogativePronouns[interrogativeType].singular[interrogativeGender][caseType]
                        }
                        example =
                          interrogativePronounExamples[interrogativeType].singular[interrogativeGender][caseType]
                      } else {
                        if (caseType === "accusative") {
                          pronoun = {
                            animate: interrogativePronouns[interrogativeType].plural.accusative.animate,
                            inanimate: interrogativePronouns[interrogativeType].plural.accusative.inanimate,
                          }
                        } else {
                          pronoun = interrogativePronouns[interrogativeType].plural[caseType]
                        }
                        example = interrogativePronounExamples[interrogativeType].plural[caseType]
                      }
                    }

                    const key = `${caseType}_interrogative`
                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "interrogative")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : (interrogativeType === "which" || interrogativeType === "whose") &&
                            caseType === "accusative" &&
                            typeof pronoun !== "string" ? (
                            <>
                              <div>
                                <div className="text-sm font-medium">Inanimate:</div>
                                <div className="font-medium text-lg">{(pronoun as AccusativeForm).inanimate}</div>
                              </div>
                              <div className="mt-2">
                                <div className="text-sm font-medium">Animate:</div>
                                <div className="font-medium text-lg">{(pronoun as AccusativeForm).animate}</div>
                              </div>
                            </>
                          ) : (
                            <div className="font-medium text-lg">{pronoun as string}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>{!hiddenEndings[key] && <div className="text-sm">{example}</div>}</TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render the negative pronoun table
  const renderNegativePronounTable = () => {
    const negativeLabels: Record<NegativeType, string> = {
      nobody: "Никто (Nobody)",
      nothing: "Ничто (Nothing)",
      no_one_to: "Некого (No one to)",
      nothing_to: "Нечего (Nothing to)",
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant={negativeType === "nobody" ? "default" : "outline"}
                onClick={() => setNegativeType("nobody")}
                size="sm"
              >
                Никто (Nobody)
              </Button>
              <Button
                variant={negativeType === "nothing" ? "default" : "outline"}
                onClick={() => setNegativeType("nothing")}
                size="sm"
              >
                Ничто (Nothing)
              </Button>
              <Button
                variant={negativeType === "no_one_to" ? "default" : "outline"}
                onClick={() => setNegativeType("no_one_to")}
                size="sm"
              >
                Некого (No one to)
              </Button>
              <Button
                variant={negativeType === "nothing_to" ? "default" : "outline"}
                onClick={() => setNegativeType("nothing_to")}
                size="sm"
              >
                Нечего (Nothing to)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{negativeLabels[negativeType]}</CardTitle>
            <CardDescription>
              {negativeType === "nobody" || negativeType === "nothing"
                ? "Negative pronoun"
                : "Negative pronoun with infinitive"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Pronoun</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    const pronoun = negativePronouns[negativeType][caseType]
                    const key = `${caseType}_negative`
                    const example = negativePronounExamples[negativeType][caseType]

                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "negative")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : (
                            <div className="font-medium text-lg">{pronoun}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>{!hiddenEndings[key] && <div className="text-sm">{example}</div>}</TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render the reflexive pronoun table
  const renderReflexivePronounTable = () => {
    const reflexiveLabels: Record<ReflexiveType, string> = {
      oneself: "Себя (Oneself)",
      each_other: "Друг друга (Each other)",
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={reflexiveType === "oneself" ? "default" : "outline"}
                onClick={() => setReflexiveType("oneself")}
                size="sm"
              >
                Себя (Oneself)
              </Button>
              <Button
                variant={reflexiveType === "each_other" ? "default" : "outline"}
                onClick={() => setReflexiveType("each_other")}
                size="sm"
              >
                Друг друга (Each other)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{reflexiveLabels[reflexiveType]}</CardTitle>
            <CardDescription>
              {reflexiveType === "oneself" ? "Reflexive pronoun" : "Reciprocal pronoun"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Pronoun</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    const pronoun = reflexivePronouns[reflexiveType][caseType]
                    const key = `${caseType}_reflexive`
                    const example = reflexivePronounExamples[reflexiveType][caseType]

                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "reflexive")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : (
                            <div className="font-medium text-lg">{pronoun}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>{!hiddenEndings[key] && <div className="text-sm">{example}</div>}</TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main component render
  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-6">




        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        <Button
          variant={pronounType === "personal" ? "default" : "outline"}
          onClick={() => setPronounType("personal")}
          className="w-full"
        >
          Personal
        </Button>
        <Button
          variant={pronounType === "possessive" ? "default" : "outline"}
          onClick={() => setPronounType("possessive")}
          className="w-full"
        >
          Possessive
        </Button>
        <Button
          variant={pronounType === "demonstrative" ? "default" : "outline"}
          onClick={() => setPronounType("demonstrative")}
          className="w-full"
        >
          Demonstrative
        </Button>
        <Button
          variant={pronounType === "interrogative" ? "default" : "outline"}
          onClick={() => setPronounType("interrogative")}
          className="w-full"
        >
          Interrogative
        </Button>
        <Button
          variant={pronounType === "negative" ? "default" : "outline"}
          onClick={() => setPronounType("negative")}
          className="w-full"
        >
          Negative
        </Button>
        <Button
          variant={pronounType === "reflexive" ? "default" : "outline"}
          onClick={() => setPronounType("reflexive")}
          className="w-full"
        >
          Reflexive
        </Button>
      </div>

      <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Switch id="examples" checked={showExamples} onCheckedChange={setShowExamples} />
              <Label htmlFor="examples" className="whitespace-nowrap">
Show Examples
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="test-mode" checked={testMode} onCheckedChange={toggleTestMode} />
              <Label htmlFor="test-mode" className="whitespace-nowrap">
Test Mode
              </Label>
            </div>
          </div>

      {/* Keep the Tabs and TabsContent components for content switching */}
      <Tabs value={pronounType} onValueChange={(value) => setPronounType(value as PronounType)}>
        <TabsContent value="personal">{renderPersonalPronounTable()}</TabsContent>
        <TabsContent value="possessive">{renderPossessivePronounTable()}</TabsContent>
        <TabsContent value="demonstrative">{renderDemonstrativePronounTable()}</TabsContent>
        <TabsContent value="interrogative">{renderInterrogativePronounTable()}</TabsContent>
        <TabsContent value="negative">{renderNegativePronounTable()}</TabsContent>
        <TabsContent value="reflexive">{renderReflexivePronounTable()}</TabsContent>
      </Tabs>
        </div>
      </div>
  )
}

