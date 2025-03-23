"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Eye, Info } from "lucide-react"

// Define TypeScript interfaces for our data structures
interface AccusativeForm {
  animate: string
  inanimate: string
}

// Define types for number categories
type NumberType = "cardinal" | "ordinal" | "collective"
type CardinalType = "one" | "two_to_four" | "five_to_twenty" | "tens" | "hundreds" | "compound"
type OrdinalType = "first" | "second" | "third" | "other"
type CollectiveType =
  | "oba"
  | "obe"
  | "dvoe"
  | "troe"
  | "chetvero"
  | "pyatero"
  | "shestero"
  | "semero"
  | "vosemero"
  | "devyatero"
  | "desyatero"
type Gender = "masculine" | "feminine" | "neuter"
type Case = "nominative" | "genitive" | "dative" | "accusative" | "instrumental" | "prepositional"

// Russian cardinal numbers data
const cardinalNumbers = {
  one: {
    masculine: {
      nominative: "один",
      genitive: "одного",
      dative: "одному",
      accusative: {
        animate: "одного",
        inanimate: "один",
      },
      instrumental: "одним",
      prepositional: "одном",
    },
    feminine: {
      nominative: "одна",
      genitive: "одной",
      dative: "одной",
      accusative: "одну",
      instrumental: "одной",
      prepositional: "одной",
    },
    neuter: {
      nominative: "одно",
      genitive: "одного",
      dative: "одному",
      accusative: "одно",
      instrumental: "одним",
      prepositional: "одном",
    },
    plural: {
      nominative: "одни",
      genitive: "одних",
      dative: "одним",
      accusative: {
        animate: "одних",
        inanimate: "одни",
      },
      instrumental: "одними",
      prepositional: "одних",
    },
  },
  two_to_four: {
    two: {
      masculine_neuter: {
        nominative: "два",
        genitive: "двух",
        dative: "двум",
        accusative: {
          animate: "двух",
          inanimate: "два",
        },
        instrumental: "двумя",
        prepositional: "двух",
      },
      feminine: {
        nominative: "две",
        genitive: "двух",
        dative: "двум",
        accusative: {
          animate: "двух",
          inanimate: "две",
        },
        instrumental: "двумя",
        prepositional: "двух",
      },
    },
    three: {
      nominative: "три",
      genitive: "трёх",
      dative: "трём",
      accusative: {
        animate: "трёх",
        inanimate: "три",
      },
      instrumental: "тремя",
      prepositional: "трёх",
    },
    four: {
      nominative: "четыре",
      genitive: "четырёх",
      dative: "четырём",
      accusative: {
        animate: "четырёх",
        inanimate: "четыре",
      },
      instrumental: "четырмя",
      prepositional: "четырёх",
    },
  },
  five_to_twenty: {
    five: {
      nominative: "пять",
      genitive: "пяти",
      dative: "пяти",
      accusative: "пять",
      instrumental: "пятью",
      prepositional: "пяти",
    },
    six: {
      nominative: "шесть",
      genitive: "шести",
      dative: "шести",
      accusative: "шесть",
      instrumental: "шестью",
      prepositional: "шести",
    },
    seven: {
      nominative: "семь",
      genitive: "семи",
      dative: "семи",
      accusative: "семь",
      instrumental: "семью",
      prepositional: "семи",
    },
    eight: {
      nominative: "восемь",
      genitive: "восьми",
      dative: "восьми",
      accusative: "восемь",
      instrumental: "восемью",
      prepositional: "восьми",
    },
    nine: {
      nominative: "девять",
      genitive: "девяти",
      dative: "девяти",
      accusative: "девять",
      instrumental: "девятью",
      prepositional: "девяти",
    },
    ten: {
      nominative: "десять",
      genitive: "десяти",
      dative: "десяти",
      accusative: "десять",
      instrumental: "десятью",
      prepositional: "десяти",
    },
    eleven: {
      nominative: "одиннадцать",
      genitive: "одиннадцати",
      dative: "одиннадцати",
      accusative: "одиннадцать",
      instrumental: "одиннадцатью",
      prepositional: "одиннадцати",
    },
    twelve: {
      nominative: "двенадцать",
      genitive: "двенадцати",
      dative: "двенадцати",
      accusative: "двенадцать",
      instrumental: "двенадцатью",
      prepositional: "двенадцати",
    },
    twenty: {
      nominative: "двадцать",
      genitive: "двадцати",
      dative: "двадцати",
      accusative: "двадцать",
      instrumental: "двадцатью",
      prepositional: "двадцати",
    },
  },
  tens: {
    thirty: {
      nominative: "тридцать",
      genitive: "тридцати",
      dative: "тридцати",
      accusative: "тридцать",
      instrumental: "тридцатью",
      prepositional: "тридцати",
    },
    forty: {
      nominative: "сорок",
      genitive: "сорока",
      dative: "сорока",
      accusative: "сорок",
      instrumental: "сорока",
      prepositional: "сорока",
    },
    fifty: {
      nominative: "пятьдесят",
      genitive: "пятидесяти",
      dative: "пятидесяти",
      accusative: "пятьдесят",
      instrumental: "пятьюдесятью",
      prepositional: "пятидесяти",
    },
    ninety: {
      nominative: "девяносто",
      genitive: "девяноста",
      dative: "девяноста",
      accusative: "девяносто",
      instrumental: "девяноста",
      prepositional: "девяноста",
    },
  },
  hundreds: {
    hundred: {
      nominative: "сто",
      genitive: "ста",
      dative: "ста",
      accusative: "сто",
      instrumental: "ста",
      prepositional: "ста",
    },
    two_hundred: {
      nominative: "двести",
      genitive: "двухсот",
      dative: "двумстам",
      accusative: "двести",
      instrumental: "двумястами",
      prepositional: "двухстах",
    },
    five_hundred: {
      nominative: "пятьсот",
      genitive: "пятисот",
      dative: "пятистам",
      accusative: "пятьсот",
      instrumental: "пятьюстами",
      prepositional: "пятистах",
    },
  },
}

// Russian ordinal numbers data
const ordinalNumbers = {
  first: {
    masculine: {
      nominative: "первый",
      genitive: "первого",
      dative: "первому",
      accusative: {
        animate: "первого",
        inanimate: "первый",
      },
      instrumental: "первым",
      prepositional: "первом",
    },
    feminine: {
      nominative: "первая",
      genitive: "первой",
      dative: "первой",
      accusative: "первую",
      instrumental: "первой",
      prepositional: "первой",
    },
    neuter: {
      nominative: "первое",
      genitive: "первого",
      dative: "первому",
      accusative: "первое",
      instrumental: "первым",
      prepositional: "первом",
    },
    plural: {
      nominative: "первые",
      genitive: "первых",
      dative: "первым",
      accusative: {
        animate: "первых",
        inanimate: "первые",
      },
      instrumental: "первыми",
      prepositional: "первых",
    },
  },
  second: {
    masculine: {
      nominative: "второй",
      genitive: "второго",
      dative: "второму",
      accusative: {
        animate: "второго",
        inanimate: "второй",
      },
      instrumental: "вторым",
      prepositional: "втором",
    },
    feminine: {
      nominative: "вторая",
      genitive: "второй",
      dative: "второй",
      accusative: "вторую",
      instrumental: "второй",
      prepositional: "второй",
    },
    neuter: {
      nominative: "второе",
      genitive: "второго",
      dative: "второму",
      accusative: "второе",
      instrumental: "вторым",
      prepositional: "втором",
    },
    plural: {
      nominative: "вторые",
      genitive: "вторых",
      dative: "вторым",
      accusative: {
        animate: "вторых",
        inanimate: "вторые",
      },
      instrumental: "вторыми",
      prepositional: "вторых",
    },
  },
  third: {
    masculine: {
      nominative: "третий",
      genitive: "третьего",
      dative: "третьему",
      accusative: {
        animate: "третьего",
        inanimate: "третий",
      },
      instrumental: "третьим",
      prepositional: "третьем",
    },
    feminine: {
      nominative: "третья",
      genitive: "третьей",
      dative: "третьей",
      accusative: "третью",
      instrumental: "третьей",
      prepositional: "третьей",
    },
    neuter: {
      nominative: "третье",
      genitive: "третьего",
      dative: "третьему",
      accusative: "третье",
      instrumental: "третьим",
      prepositional: "третьем",
    },
    plural: {
      nominative: "третьи",
      genitive: "третьих",
      dative: "третьим",
      accusative: {
        animate: "третьих",
        inanimate: "третьи",
      },
      instrumental: "третьими",
      prepositional: "третьих",
    },
  },
  other: {
    fifth: {
      masculine: {
        nominative: "пятый",
        genitive: "пятого",
        dative: "пятому",
        accusative: {
          animate: "пятого",
          inanimate: "пятый",
        },
        instrumental: "пятым",
        prepositional: "пятом",
      },
      feminine: {
        nominative: "пятая",
        genitive: "пятой",
        dative: "пятой",
        accusative: "пятую",
        instrumental: "пятой",
        prepositional: "пятой",
      },
      neuter: {
        nominative: "пятое",
        genitive: "пятого",
        dative: "пятому",
        accusative: "пятое",
        instrumental: "пятым",
        prepositional: "пятом",
      },
      plural: {
        nominative: "пятые",
        genitive: "пятых",
        dative: "пятым",
        accusative: {
          animate: "пятых",
          inanimate: "пятые",
        },
        instrumental: "пятыми",
        prepositional: "пятых",
      },
    },
    tenth: {
      masculine: {
        nominative: "десятый",
        genitive: "десятого",
        dative: "десятому",
        accusative: {
          animate: "десятого",
          inanimate: "десятый",
        },
        instrumental: "десятым",
        prepositional: "десятом",
      },
      feminine: {
        nominative: "десятая",
        genitive: "десятой",
        dative: "десятой",
        accusative: "десятую",
        instrumental: "десятой",
        prepositional: "десятой",
      },
      neuter: {
        nominative: "десятое",
        genitive: "десятого",
        dative: "десятому",
        accusative: "десятое",
        instrumental: "десятым",
        prepositional: "десятом",
      },
      plural: {
        nominative: "десятые",
        genitive: "десятых",
        dative: "десятым",
        accusative: {
          animate: "десятых",
          inanimate: "десятые",
        },
        instrumental: "десятыми",
        prepositional: "десятых",
      },
    },
  },
}

// Russian collective numbers data
const collectiveNumbers = {
  oba: {
    masculine: {
      nominative: "оба",
      genitive: "обоих",
      dative: "обоим",
      accusative: {
        animate: "обоих",
        inanimate: "оба",
      },
      instrumental: "обоими",
      prepositional: "обоих",
    },
    neuter: {
      nominative: "оба",
      genitive: "обоих",
      dative: "обоим",
      accusative: {
        animate: "обоих",
        inanimate: "оба",
      },
      instrumental: "обоими",
      prepositional: "обоих",
    },
  },
  obe: {
    feminine: {
      nominative: "обе",
      genitive: "обеих",
      dative: "обеим",
      accusative: "обеих",
      instrumental: "обеими",
      prepositional: "обеих",
    },
  },
  dvoe: {
    nominative: "двое",
    genitive: "двоих",
    dative: "двоим",
    accusative: {
      animate: "двоих",
      inanimate: "двое",
    },
    instrumental: "двоими",
    prepositional: "двоих",
  },
  troe: {
    nominative: "трое",
    genitive: "троих",
    dative: "троим",
    accusative: {
      animate: "троих",
      inanimate: "трое",
    },
    instrumental: "троими",
    prepositional: "троих",
  },
  chetvero: {
    nominative: "четверо",
    genitive: "четверых",
    dative: "четверым",
    accusative: {
      animate: "четверых",
      inanimate: "четверо",
    },
    instrumental: "четверыми",
    prepositional: "четверых",
  },
  pyatero: {
    nominative: "пятеро",
    genitive: "пятерых",
    dative: "пятерым",
    accusative: {
      animate: "пятерых",
      inanimate: "пятеро",
    },
    instrumental: "пятерыми",
    prepositional: "пятерых",
  },
  shestero: {
    nominative: "шестеро",
    genitive: "шестерых",
    dative: "шестерым",
    accusative: {
      animate: "шестерых",
      inanimate: "шестеро",
    },
    instrumental: "шестерыми",
    prepositional: "шестерых",
  },
  semero: {
    nominative: "семеро",
    genitive: "семерых",
    dative: "семерым",
    accusative: {
      animate: "семерых",
      inanimate: "семеро",
    },
    instrumental: "семерыми",
    prepositional: "семерых",
  },
  vosemero: {
    nominative: "восьмеро",
    genitive: "восьмерых",
    dative: "восьмерым",
    accusative: {
      animate: "восьмерых",
      inanimate: "восьмеро",
    },
    instrumental: "восьмерыми",
    prepositional: "восьмерых",
  },
  devyatero: {
    nominative: "девятеро",
    genitive: "девятерых",
    dative: "девятерым",
    accusative: {
      animate: "девятерых",
      inanimate: "девятеро",
    },
    instrumental: "девятерыми",
    prepositional: "девятерых",
  },
  desyatero: {
    nominative: "десятеро",
    genitive: "десятерых",
    dative: "десятерым",
    accusative: {
      animate: "десятерых",
      inanimate: "десятеро",
    },
    instrumental: "десятерыми",
    prepositional: "десятерых",
  },
}

// Examples for cardinal numbers
const cardinalExamples = {
  one: {
    masculine: {
      nominative: "Один студент пришёл.",
      genitive: "У одного студента есть книга.",
      dative: "Я дал книгу одному студенту.",
      accusative: {
        animate: "Я вижу одного студента.",
        inanimate: "Я вижу один стол.",
      },
      instrumental: "Я говорю с одним студентом.",
      prepositional: "Я думаю об одном студенте.",
    },
    feminine: {
      nominative: "Одна студентка пришла.",
      genitive: "У одной студентки есть книга.",
      dative: "Я дал книгу одной студентке.",
      accusative: "Я вижу одну студентку.",
      instrumental: "Я говорю с одной студенткой.",
      prepositional: "Я думаю об одной студентке.",
    },
    neuter: {
      nominative: "Одно окно открыто.",
      genitive: "У одного окна стоит стол.",
      dative: "К одному окну подошёл человек.",
      accusative: "Я вижу одно окно.",
      instrumental: "Я доволен одним окном.",
      prepositional: "Я думаю об одном окне.",
    },
    plural: {
      nominative: "Одни часы лежат на столе.",
      genitive: "У одних часов нет стрелки.",
      dative: "К одним часам подошёл мастер.",
      accusative: {
        animate: "Я вижу одних студентов.",
        inanimate: "Я вижу одни часы.",
      },
      instrumental: "Я доволен одними часами.",
      prepositional: "Я думаю об одних часах.",
    },
  },
  two_to_four: {
    two: {
      masculine_neuter: {
        nominative: "Два стола стоят в комнате.",
        genitive: "У двух столов есть ножки.",
        dative: "К двум столам подошли люди.",
        accusative: {
          animate: "Я вижу двух студентов.",
          inanimate: "Я вижу два стола.",
        },
        instrumental: "Я доволен двумя столами.",
        prepositional: "Я думаю о двух столах.",
      },
      feminine: {
        nominative: "Две книги лежат на столе.",
        genitive: "У двух книг красивые обложки.",
        dative: "К двум книгам проявили интерес.",
        accusative: {
          animate: "Я вижу двух студенток.",
          inanimate: "Я вижу две книги.",
        },
        instrumental: "Я доволен двумя книгами.",
        prepositional: "Я думаю о двух книгах.",
      },
    },
    three: {
      nominative: "Три стола стоят в комнате.",
      genitive: "У трёх столов есть ножки.",
      dative: "К трём столам подошли люди.",
      accusative: {
        animate: "Я вижу трёх студентов.",
        inanimate: "Я вижу три стола.",
      },
      instrumental: "Я доволен тремя столами.",
      prepositional: "Я думаю о трёх столах.",
    },
    four: {
      nominative: "Четыре книги лежат на столе.",
      genitive: "У четырёх книг красивые обложки.",
      dative: "К четырём книгам проявили интерес.",
      accusative: {
        animate: "Я вижу четырёх студентов.",
        inanimate: "Я вижу четыре книги.",
      },
      instrumental: "Я доволен четырьмя книгами.",
      prepositional: "Я думаю о четырёх книгах.",
    },
  },
  five_to_twenty: {
    five: {
      nominative: "Пять студентов пришли.",
      genitive: "У пяти студентов есть книги.",
      dative: "Я дал книги пяти студентам.",
      accusative: "Я вижу пять студентов.",
      instrumental: "Я говорю с пятью студентами.",
      prepositional: "Я думаю о пяти студентах.",
    },
    ten: {
      nominative: "Десять студентов пришли.",
      genitive: "У десяти студентов есть книги.",
      dative: "Я дал книги десяти студентам.",
      accusative: "Я вижу десять студентов.",
      instrumental: "Я говорю с десятью студентами.",
      prepositional: "Я думаю о десяти студентах.",
    },
    twenty: {
      nominative: "Двадцать студентов пришли.",
      genitive: "У двадцати студентов есть книги.",
      dative: "Я дал книги двадцати студентам.",
      accusative: "Я вижу двадцать студентов.",
      instrumental: "Я говорю с двадцатью студентами.",
      prepositional: "Я думаю о двадцати студентах.",
    },
  },
  tens: {
    forty: {
      nominative: "Сорок студентов пришли.",
      genitive: "У сорока студентов есть книги.",
      dative: "Я дал книги сорока студентам.",
      accusative: "Я вижу сорок студентов.",
      instrumental: "Я говорю с сорока студентами.",
      prepositional: "Я думаю о сорока студентах.",
    },
    fifty: {
      nominative: "Пятьдесят студентов пришли.",
      genitive: "У пятидесяти студентов есть книги.",
      dative: "Я дал книги пятидесяти студентам.",
      accusative: "Я вижу пятьдесят студентов.",
      instrumental: "Я говорю с пятьюдесятью студентами.",
      prepositional: "Я думаю о пятидесяти студентах.",
    },
  },
  hundreds: {
    hundred: {
      nominative: "Сто студентов пришли.",
      genitive: "У ста студентов есть книги.",
      dative: "Я дал книги ста студентам.",
      accusative: "Я вижу сто студентов.",
      instrumental: "Я говорю со ста студентами.",
      prepositional: "Я думаю о ста студентах.",
    },
    two_hundred: {
      nominative: "Двести студентов пришли.",
      genitive: "У двухсот студентов есть книги.",
      dative: "Я дал книги двумстам студентам.",
      accusative: "Я вижу двести студентов.",
      instrumental: "Я говорю с двумястами студентами.",
      prepositional: "Я думаю о двухстах студентах.",
    },
  },
}

// Examples for ordinal numbers
const ordinalExamples = {
  first: {
    masculine: {
      nominative: "Первый студент пришёл.",
      genitive: "У первого студента есть книга.",
      dative: "Я дал книгу первому студенту.",
      accusative: {
        animate: "Я вижу первого студента.",
        inanimate: "Я вижу первый дом.",
      },
      instrumental: "Я говорю с первым студентом.",
      prepositional: "Я думаю о первом студенте.",
    },
    feminine: {
      nominative: "Первая студентка пришла.",
      genitive: "У первой студентки есть книга.",
      dative: "Я дал книгу первой студентке.",
      accusative: "Я вижу первую студентку.",
      instrumental: "Я говорю с первой студенткой.",
      prepositional: "Я думаю о первой студентке.",
    },
    neuter: {
      nominative: "Первое задание выполнено.",
      genitive: "Часть первого задания сложная.",
      dative: "Приступаю к первому заданию.",
      accusative: "Я выполнил первое задание.",
      instrumental: "Я справился с первым заданием.",
      prepositional: "Я думаю о первом задании.",
    },
    plural: {
      nominative: "Первые студенты пришли.",
      genitive: "У первых студентов есть книги.",
      dative: "Я дал книги первым студентам.",
      accusative: {
        animate: "Я вижу первых студентов.",
        inanimate: "Я вижу первые дома.",
      },
      instrumental: "Я говорю с первыми студентами.",
      prepositional: "Я думаю о первых студентах.",
    },
  },
  second: {
    masculine: {
      nominative: "Второй студент пришёл.",
      genitive: "У второго студента есть книга.",
      dative: "Я дал книгу второму студенту.",
      accusative: {
        animate: "Я вижу второго студента.",
        inanimate: "Я вижу второй дом.",
      },
      instrumental: "Я говорю со вторым студентом.",
      prepositional: "Я думаю о втором студенте.",
    },
    feminine: {
      nominative: "Вторая студентка пришла.",
      genitive: "У второй студентки есть книга.",
      dative: "Я дал книгу второй студентке.",
      accusative: "Я вижу вторую студентку.",
      instrumental: "Я говорю со второй студенткой.",
      prepositional: "Я думаю о второй студентке.",
    },
    neuter: {
      nominative: "Второе задание выполнено.",
      genitive: "Часть второго задания сложная.",
      dative: "Приступаю ко второму заданию.",
      accusative: "Я выполнил второе задание.",
      instrumental: "Я справился со вторым заданием.",
      prepositional: "Я думаю о втором задании.",
    },
    plural: {
      nominative: "Вторые студенты пришли.",
      genitive: "У вторых студентов есть книги.",
      dative: "Я дал книги вторым студентам.",
      accusative: {
        animate: "Я вижу вторых студентов.",
        inanimate: "Я вижу вторые дома.",
      },
      instrumental: "Я говорю со вторыми студентами.",
      prepositional: "Я думаю о вторых студентах.",
    },
  },
  third: {
    masculine: {
      nominative: "Третий студент пришёл.",
      genitive: "У третьего студента есть книга.",
      dative: "Я дал книгу третьему студенту.",
      accusative: {
        animate: "Я вижу третьего студента.",
        inanimate: "Я вижу третий дом.",
      },
      instrumental: "Я говорю с третьим студентом.",
      prepositional: "Я думаю о третьем студенте.",
    },
    feminine: {
      nominative: "Третья студентка пришла.",
      genitive: "У третьей студентки есть книга.",
      dative: "Я дал книгу третьей студентке.",
      accusative: "Я вижу третью студентку.",
      instrumental: "Я говорю с третьей студенткой.",
      prepositional: "Я думаю о третьей студентке.",
    },
    neuter: {
      nominative: "Третье задание выполнено.",
      genitive: "Часть третьего задания сложная.",
      dative: "Приступаю к третьему заданию.",
      accusative: "Я выполнил третье задание.",
      instrumental: "Я справился с третьим заданием.",
      prepositional: "Я думаю о третьем задании.",
    },
    plural: {
      nominative: "Третьи студенты пришли.",
      genitive: "У третьих студентов есть книги.",
      dative: "Я дал книги третьим студентам.",
      accusative: {
        animate: "Я вижу третьих студентов.",
        inanimate: "Я вижу третьи дома.",
      },
      instrumental: "Я говорю с третьими студентами.",
      prepositional: "Я думаю о третьих студентах.",
    },
  },
  other: {
    fifth: {
      masculine: {
        nominative: "Пятый студент пришёл.",
        genitive: "У пятого студента есть книга.",
        dative: "Я дал книгу пятому студенту.",
        accusative: {
          animate: "Я вижу пятого студента.",
          inanimate: "Я вижу пятый дом.",
        },
        instrumental: "Я говорю с пятым студентом.",
        prepositional: "Я думаю о пятом студенте.",
      },
      feminine: {
        nominative: "Пятая студентка пришла.",
        genitive: "У пятой студентки есть книга.",
        dative: "Я дал книгу пятой студентке.",
        accusative: "Я вижу пятую студентку.",
        instrumental: "Я говорю с пятой студенткой.",
        prepositional: "Я думаю о пятой студентке.",
      },
      neuter: {
        nominative: "Пятое задание выполнено.",
        genitive: "Часть пятого задания сложная.",
        dative: "Приступаю к пятому заданию.",
        accusative: "Я выполнил пятое задание.",
        instrumental: "Я справился с пятым заданием.",
        prepositional: "Я думаю о пятом задании.",
      },
      plural: {
        nominative: "Пятые студенты пришли.",
        genitive: "У пятых студентов есть книги.",
        dative: "Я дал книги пятым студентам.",
        accusative: {
          animate: "Я вижу пятых студентов.",
          inanimate: "Я вижу пятые дома.",
        },
        instrumental: "Я говорю с пятыми студентами.",
        prepositional: "Я думаю о пятых студентах.",
      },
    },
    tenth: {
      masculine: {
        nominative: "Десятый студент пришёл.",
        genitive: "У десятого студента есть книга.",
        dative: "Я дал книгу десятому студенту.",
        accusative: {
          animate: "Я вижу десятого студента.",
          inanimate: "Я вижу десятый дом.",
        },
        instrumental: "Я говорю с десятым студентом.",
        prepositional: "Я думаю о десятом студенте.",
      },
      feminine: {
        nominative: "Десятая студентка пришла.",
        genitive: "У десятой студентки есть книга.",
        dative: "Я дал книгу десятой студентке.",
        accusative: "Я вижу десятую студентку.",
        instrumental: "Я говорю с десятой студенткой.",
        prepositional: "Я думаю о десятой студентке.",
      },
      neuter: {
        nominative: "Десятое задание выполнено.",
        genitive: "Часть десятого задания сложная.",
        dative: "Приступаю к десятому заданию.",
        accusative: "Я выполнил десятое задание.",
        instrumental: "Я справился с десятым заданием.",
        prepositional: "Я думаю о десятом задании.",
      },
      plural: {
        nominative: "Десятые студенты пришли.",
        genitive: "У десятых студентов есть книги.",
        dative: "Я дал книги десятым студентам.",
        accusative: {
          animate: "Я вижу десятых студентов.",
          inanimate: "Я вижу десятые дома.",
        },
        instrumental: "Я говорю с десятыми студентами.",
        prepositional: "Я думаю о десятых студентах.",
      },
    },
  },
}

// Examples for collective numbers
const collectiveExamples = {
  oba: {
    masculine: {
      nominative: "Оба мальчика пришли.",
      genitive: "У обоих мальчиков есть книги.",
      dative: "Я дал книги обоим мальчикам.",
      accusative: {
        animate: "Я вижу обоих мальчиков.",
        inanimate: "Я вижу оба стола.",
      },
      instrumental: "Я говорю с обоими мальчиками.",
      prepositional: "Я думаю об обоих мальчиках.",
    },
    neuter: {
      nominative: "Оба окна открыты.",
      genitive: "У обоих окон есть шторы.",
      dative: "Я подошёл к обоим окнам.",
      accusative: {
        animate: "Я вижу обоих животных.",
        inanimate: "Я вижу оба окна.",
      },
      instrumental: "Я доволен обоими окнами.",
      prepositional: "Я думаю об обоих окнах.",
    },
  },
  obe: {
    feminine: {
      nominative: "Обе девочки пришли.",
      genitive: "У обеих девочек есть книги.",
      dative: "Я дал книги обеим девочкам.",
      accusative: "Я вижу обеих девочек.",
      instrumental: "Я говорю с обеими девочками.",
      prepositional: "Я думаю об обеих девочках.",
    },
  },
  dvoe: {
    nominative: "Двое студентов пришли.",
    genitive: "У двоих студентов есть книги.",
    dative: "Я дал книги двоим студентам.",
    accusative: {
      animate: "Я вижу двоих студентов.",
      inanimate: "Я вижу двое ножниц.",
    },
    instrumental: "Я говорю с двоими студентами.",
    prepositional: "Я думаю о двоих студентах.",
  },
  troe: {
    nominative: "Трое друзей пришли.",
    genitive: "У троих друзей есть книги.",
    dative: "Я дал книги троим друзьям.",
    accusative: {
      animate: "Я вижу троих друзей.",
      inanimate: "Я вижу трое часов.",
    },
    instrumental: "Я говорю с троими друзьями.",
    prepositional: "Я думаю о троих друзьях.",
  },
  chetvero: {
    nominative: "Четверо мужчин пришли.",
    genitive: "У четверых мужчин есть книги.",
    dative: "Я дал книги четверым мужчинам.",
    accusative: {
      animate: "Я вижу четверых мужчин.",
      inanimate: "Я вижу четверо суток.",
    },
    instrumental: "Я говорю с четверыми мужчинами.",
    prepositional: "Я думаю о четверых мужчинах.",
  },
  pyatero: {
    nominative: "Пятеро детей играют.",
    genitive: "У пятерых детей есть игрушки.",
    dative: "Я дал конфеты пятерым детям.",
    accusative: {
      animate: "Я вижу пятерых детей.",
      inanimate: "Я вижу пятеро окон.",
    },
    instrumental: "Я играю с пятерыми детьми.",
    prepositional: "Я думаю о пятерых детях.",
  },
  shestero: {
    nominative: "Шестеро солдат стоят в строю.",
    genitive: "У шестерых солдат есть оружие.",
    dative: "Я отдал приказ шестерым солдатам.",
    accusative: {
      animate: "Я вижу шестерых солдат.",
      inanimate: "Я вижу шестеро ворот.",
    },
    instrumental: "Я разговариваю с шестерыми солдатами.",
    prepositional: "Я думаю о шестерых солдатах.",
  },
  semero: {
    nominative: "Семеро козлят играют.",
    genitive: "У семерых козлят есть мама.",
    dative: "Я дал еду семерым козлятам.",
    accusative: {
      animate: "Я вижу семерых козлят.",
      inanimate: "Я вижу семеро дверей.",
    },
    instrumental: "Я играю с семерыми козлятами.",
    prepositional: "Я думаю о семерых козлятах.",
  },
  vosemero: {
    nominative: "Восьмеро студентов сдали экзамен.",
    genitive: "У восьмерых студентов хорошие оценки.",
    dative: "Я дал задание восьмерым студентам.",
    accusative: {
      animate: "Я вижу восьмерых студентов.",
      inanimate: "Я вижу восьмеро саней.",
    },
    instrumental: "Я разговариваю с восьмерыми студентами.",
    prepositional: "Я думаю о восьмерых студентах.",
  },
  desyatero: {
    nominative: "Десятеро рабочих строят дом.",
    genitive: "У десятерых рабочих есть инструменты.",
    dative: "Я дал задание десятерым рабочим.",
    accusative: {
      animate: "Я вижу десятерых рабочих.",
      inanimate: "Я вижу десятеро граблей.",
    },
    instrumental: "Я разговариваю с десятерыми рабочими.",
    prepositional: "Я думаю о десятерых рабочих.",
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

// Translations for number types
const numberTypeTranslations = {
  cardinal: "Количественные",
  ordinal: "Порядковые",
  collective: "Собирательные",
}

// Component for the number declension explorer
export default function NumberDeclensionTable() {
  // Main state
  const [numberType, setNumberType] = useState<NumberType>("cardinal")
  const [showExamples, setShowExamples] = useState(true)
  const [hiddenEndings, setHiddenEndings] = useState<Record<string, boolean>>({})
  const [testMode, setTestMode] = useState(false)

  // For cardinal numbers
  const [cardinalType, setCardinalType] = useState<CardinalType>("one")
  const [cardinalSubType, setCardinalSubType] = useState<string>("masculine")
  const [cardinalSpecificNumber, setCardinalSpecificNumber] = useState<string>("five")

  // For ordinal numbers
  const [ordinalType, setOrdinalType] = useState<OrdinalType>("first")
  const [ordinalGender, setOrdinalGender] = useState<Gender>("masculine")
  const [ordinalNumber, setOrdinalNumber] = useState<string>("singular")
  const [ordinalSpecificNumber, setOrdinalSpecificNumber] = useState<string>("fifth")

  // For collective numbers
  const [collectiveType, setCollectiveType] = useState<CollectiveType>("dvoe")
  const [collectiveGender, setCollectiveGender] = useState<Gender>("masculine")

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
        allHidden[`${caseType}_cardinal`] = true
        allHidden[`${caseType}_ordinal`] = true
        allHidden[`${caseType}_collective`] = true
      })
      setHiddenEndings(allHidden)
    } else {
      // Show all endings
      setHiddenEndings({})
    }
    setTestMode(!testMode)
  }

  // Render the cardinal number table
  const renderCardinalNumberTable = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cardinal Number Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={cardinalType === "one" ? "default" : "outline"}
                  onClick={() => {
                    setCardinalType("one")
                    setCardinalSubType("masculine")
                  }}
                  size="sm"
                >
                  Один (1)
                </Button>
                <Button
                  variant={cardinalType === "two_to_four" ? "default" : "outline"}
                  onClick={() => {
                    setCardinalType("two_to_four")
                    setCardinalSubType("two")
                    setCardinalSpecificNumber("masculine_neuter")
                  }}
                  size="sm"
                >
                  2-4
                </Button>
                <Button
                  variant={cardinalType === "five_to_twenty" ? "default" : "outline"}
                  onClick={() => {
                    setCardinalType("five_to_twenty")
                    setCardinalSpecificNumber("five")
                  }}
                  size="sm"
                >
                  5-20
                </Button>
                <Button
                  variant={cardinalType === "tens" ? "default" : "outline"}
                  onClick={() => {
                    setCardinalType("tens")
                    setCardinalSpecificNumber("forty")
                  }}
                  size="sm"
                >
                  Десятки (30-90)
                </Button>
                <Button
                  variant={cardinalType === "hundreds" ? "default" : "outline"}
                  onClick={() => {
                    setCardinalType("hundreds")
                    setCardinalSpecificNumber("hundred")
                  }}
                  size="sm"
                >
                  Сотни (100-900)
                </Button>
              </div>
            </CardContent>
          </Card>

          {cardinalType === "one" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Gender/Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={cardinalSubType === "masculine" ? "default" : "outline"}
                    onClick={() => setCardinalSubType("masculine")}
                    size="sm"
                  >
                    Masculine (он)
                  </Button>
                  <Button
                    variant={cardinalSubType === "feminine" ? "default" : "outline"}
                    onClick={() => setCardinalSubType("feminine")}
                    size="sm"
                  >
                    Feminine (она)
                  </Button>
                  <Button
                    variant={cardinalSubType === "neuter" ? "default" : "outline"}
                    onClick={() => setCardinalSubType("neuter")}
                    size="sm"
                  >
                    Neuter (оно)
                  </Button>
                  <Button
                    variant={cardinalSubType === "plural" ? "default" : "outline"}
                    onClick={() => setCardinalSubType("plural")}
                    size="sm"
                  >
                    Plural (одни)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {cardinalType === "two_to_four" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={cardinalSubType === "two" ? "default" : "outline"}
                    onClick={() => {
                      setCardinalSubType("two")
                      setCardinalSpecificNumber("masculine_neuter")
                    }}
                    size="sm"
                  >
                    Два/Две (2)
                  </Button>
                  <Button
                    variant={cardinalSubType === "three" ? "default" : "outline"}
                    onClick={() => setCardinalSubType("three")}
                    size="sm"
                  >
                    Три (3)
                  </Button>
                  <Button
                    variant={cardinalSubType === "four" ? "default" : "outline"}
                    onClick={() => setCardinalSubType("four")}
                    size="sm"
                  >
                    Четыре (4)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {cardinalType === "two_to_four" && cardinalSubType === "two" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Gender</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={cardinalSpecificNumber === "masculine_neuter" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("masculine_neuter")}
                    size="sm"
                  >
                    Masculine/Neuter (два)
                  </Button>
                  <Button
                    variant={cardinalSpecificNumber === "feminine" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("feminine")}
                    size="sm"
                  >
                    Feminine (две)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {cardinalType === "five_to_twenty" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={cardinalSpecificNumber === "five" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("five")}
                    size="sm"
                  >
                    Пять (5)
                  </Button>
                  <Button
                    variant={cardinalSpecificNumber === "ten" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("ten")}
                    size="sm"
                  >
                    Десять (10)
                  </Button>
                  <Button
                    variant={cardinalSpecificNumber === "twenty" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("twenty")}
                    size="sm"
                  >
                    Двадцать (20)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {cardinalType === "tens" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={cardinalSpecificNumber === "forty" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("forty")}
                    size="sm"
                  >
                    Сорок (40)
                  </Button>
                  <Button
                    variant={cardinalSpecificNumber === "fifty" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("fifty")}
                    size="sm"
                  >
                    Пятьдесят (50)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {cardinalType === "hundreds" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={cardinalSpecificNumber === "hundred" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("hundred")}
                    size="sm"
                  >
                    Сто (100)
                  </Button>
                  <Button
                    variant={cardinalSpecificNumber === "two_hundred" ? "default" : "outline"}
                    onClick={() => setCardinalSpecificNumber("two_hundred")}
                    size="sm"
                  >
                    Двести (200)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {cardinalType === "one"
                ? `Один/Одна/Одно/Одни (${cardinalSubType})`
                : cardinalType === "two_to_four"
                  ? cardinalSubType === "two"
                    ? cardinalSpecificNumber === "masculine_neuter"
                      ? "Два (masculine/neuter)"
                      : "Две (feminine)"
                    : cardinalSubType === "three"
                      ? "Три (3)"
                      : "Четыре (4)"
                  : cardinalType === "five_to_twenty"
                    ? cardinalSpecificNumber === "five"
                      ? "Пять (5)"
                      : cardinalSpecificNumber === "ten"
                        ? "Десять (10)"
                        : "Двадцать (20)"
                    : cardinalType === "tens"
                      ? cardinalSpecificNumber === "forty"
                        ? "Сорок (40)"
                        : "Пятьдесят (50)"
                      : cardinalSpecificNumber === "hundred"
                        ? "Сто (100)"
                        : "Двести (200)"}
            </CardTitle>
            <CardDescription>Cardinal number declension across cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Number</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    let number: string | AccusativeForm = ""
                    let example: string | AccusativeForm | undefined = ""

                    if (cardinalType === "one") {
                      if (
                        caseType === "accusative" &&
                        (cardinalSubType === "masculine" || cardinalSubType === "plural")
                      ) {
                        number = cardinalNumbers.one[cardinalSubType as "masculine" | "plural"]
                          .accusative as AccusativeForm
                      } else {
                        number = cardinalNumbers.one[cardinalSubType as "masculine" | "feminine" | "neuter" | "plural"][
                          caseType
                        ] as string
                      }
                      example =
                        cardinalExamples.one[cardinalSubType as "masculine" | "feminine" | "neuter" | "plural"][
                          caseType
                        ]
                    } else if (cardinalType === "two_to_four") {
                      if (cardinalSubType === "two") {
                        if (caseType === "accusative") {
                          number = cardinalNumbers.two_to_four.two[
                            cardinalSpecificNumber as "masculine_neuter" | "feminine"
                          ].accusative as AccusativeForm
                        } else {
                          number = cardinalNumbers.two_to_four.two[
                            cardinalSpecificNumber as "masculine_neuter" | "feminine"
                          ][caseType] as string
                        }
                        example =
                          cardinalExamples.two_to_four.two[cardinalSpecificNumber as "masculine_neuter" | "feminine"][
                            caseType
                          ]
                      } else if (cardinalSubType === "three") {
                        if (caseType === "accusative") {
                          number = cardinalNumbers.two_to_four.three.accusative as AccusativeForm
                        } else {
                          number = cardinalNumbers.two_to_four.three[caseType] as string
                        }
                        example = cardinalExamples.two_to_four.three[caseType]
                      } else if (cardinalSubType === "four") {
                        if (caseType === "accusative") {
                          number = cardinalNumbers.two_to_four.four.accusative as AccusativeForm
                        } else {
                          number = cardinalNumbers.two_to_four.four[caseType] as string
                        }
                        example = cardinalExamples.two_to_four.four[caseType]
                      }
                    } else if (cardinalType === "five_to_twenty") {
                      number = cardinalNumbers.five_to_twenty[cardinalSpecificNumber as "five" | "ten" | "twenty"][
                        caseType
                      ] as string
                      example =
                        cardinalExamples.five_to_twenty[cardinalSpecificNumber as "five" | "ten" | "twenty"][caseType]
                    } else if (cardinalType === "tens") {
                      number = cardinalNumbers.tens[cardinalSpecificNumber as "forty" | "fifty"][caseType] as string
                      example = cardinalExamples.tens[cardinalSpecificNumber as "forty" | "fifty"][caseType]
                    } else if (cardinalType === "hundreds") {
                      number = cardinalNumbers.hundreds[cardinalSpecificNumber as "hundred" | "two_hundred"][
                        caseType
                      ] as string
                      example = cardinalExamples.hundreds[cardinalSpecificNumber as "hundred" | "two_hundred"][caseType]
                    }

                    const key = `${caseType}_cardinal`
                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "cardinal")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : typeof number === "object" && number.animate && number.inanimate ? (
                            <>
                              <div>
                                <div className="text-sm font-medium">Inanimate:</div>
                                <div className="font-medium text-lg">{number.inanimate}</div>
                              </div>
                              <div className="mt-2">
                                <div className="text-sm font-medium">Animate:</div>
                                <div className="font-medium text-lg">{number.animate}</div>
                              </div>
                            </>
                          ) : (
                            <div className="font-medium text-lg">{number}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>
                            {!hiddenEndings[key] && (
                              <div className="text-sm">
                                {typeof example === "object" && example?.animate && example?.inanimate ? (
                                  <>
                                    <div>Inanimate: {example.inanimate}</div>
                                    <div>Animate: {example.animate}</div>
                                  </>
                                ) : (
                                  example
                                )}
                              </div>
                            )}
                          </TableCell>
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

  // Render the ordinal number table
  const renderOrdinalNumberTable = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ordinal Number</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={ordinalType === "first" ? "default" : "outline"}
                  onClick={() => setOrdinalType("first")}
                  size="sm"
                >
                  Первый (1st)
                </Button>
                <Button
                  variant={ordinalType === "second" ? "default" : "outline"}
                  onClick={() => setOrdinalType("second")}
                  size="sm"
                >
                  Второй (2nd)
                </Button>
                <Button
                  variant={ordinalType === "third" ? "default" : "outline"}
                  onClick={() => setOrdinalType("third")}
                  size="sm"
                >
                  Третий (3rd)
                </Button>
                <Button
                  variant={ordinalType === "other" ? "default" : "outline"}
                  onClick={() => {
                    setOrdinalType("other")
                    setOrdinalSpecificNumber("fifth")
                  }}
                  size="sm"
                >
                  Other
                </Button>
              </div>
            </CardContent>
          </Card>

          {ordinalType === "other" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={ordinalSpecificNumber === "fifth" ? "default" : "outline"}
                    onClick={() => setOrdinalSpecificNumber("fifth")}
                    size="sm"
                  >
                    Пятый (5th)
                  </Button>
                  <Button
                    variant={ordinalSpecificNumber === "tenth" ? "default" : "outline"}
                    onClick={() => setOrdinalSpecificNumber("tenth")}
                    size="sm"
                  >
                    Десятый (10th)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Gender/Number</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={ordinalGender === "masculine" && ordinalNumber === "singular" ? "default" : "outline"}
                  onClick={() => {
                    setOrdinalGender("masculine")
                    setOrdinalNumber("singular")
                  }}
                  size="sm"
                >
                  Masculine (он)
                </Button>
                <Button
                  variant={ordinalGender === "feminine" && ordinalNumber === "singular" ? "default" : "outline"}
                  onClick={() => {
                    setOrdinalGender("feminine")
                    setOrdinalNumber("singular")
                  }}
                  size="sm"
                >
                  Feminine (она)
                </Button>
                <Button
                  variant={ordinalGender === "neuter" && ordinalNumber === "singular" ? "default" : "outline"}
                  onClick={() => {
                    setOrdinalGender("neuter")
                    setOrdinalNumber("singular")
                  }}
                  size="sm"
                >
                  Neuter (оно)
                </Button>
                <Button
                  variant={ordinalNumber === "plural" ? "default" : "outline"}
                  onClick={() => setOrdinalNumber("plural")}
                  size="sm"
                >
                  Plural
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {ordinalType === "first"
                ? "Первый (1st)"
                : ordinalType === "second"
                  ? "Второй (2nd)"
                  : ordinalType === "third"
                    ? "Третий (3rd)"
                    : ordinalSpecificNumber === "fifth"
                      ? "Пятый (5th)"
                      : "Десятый (10th)"}{" "}
              {ordinalNumber === "plural"
                ? "(Plural)"
                : ordinalGender === "masculine"
                  ? "(Masculine)"
                  : ordinalGender === "feminine"
                    ? "(Feminine)"
                    : "(Neuter)"}
            </CardTitle>
            <CardDescription>Ordinal number declension across cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Number</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    let number: string | AccusativeForm = ""
                    let example: string | AccusativeForm | undefined = ""

                    try {
                      if (ordinalType === "other") {
                        if (ordinalNumber === "plural") {
                          if (caseType === "accusative") {
                            number = ordinalNumbers.other[ordinalSpecificNumber as "fifth" | "tenth"].plural
                              .accusative as AccusativeForm
                          } else {
                            number = ordinalNumbers.other[ordinalSpecificNumber as "fifth" | "tenth"].plural[
                              caseType
                            ] as string
                          }
                        } else {
                          if (caseType === "accusative" && ordinalGender === "masculine") {
                            number = ordinalNumbers.other[ordinalSpecificNumber as "fifth" | "tenth"][ordinalGender]
                              .accusative as AccusativeForm
                          } else {
                            number = ordinalNumbers.other[ordinalSpecificNumber as "fifth" | "tenth"][ordinalGender][
                              caseType
                            ] as string
                          }
                        }

                        // Safely access example data
                        if (
                          ordinalExamples.other &&
                          ordinalExamples.other[ordinalSpecificNumber as "fifth" | "tenth"] &&
                          ordinalExamples.other[ordinalSpecificNumber as "fifth" | "tenth"][ordinalGender]
                        ) {
                          example =
                            ordinalExamples.other[ordinalSpecificNumber as "fifth" | "tenth"][ordinalGender][caseType]
                        } else if (
                          ordinalExamples[ordinalSpecificNumber as "fifth"] &&
                          ordinalExamples[ordinalSpecificNumber as "fifth"][ordinalGender]
                        ) {
                          example = ordinalExamples[ordinalSpecificNumber as "fifth"][ordinalGender][caseType]
                        }
                      } else {
                        if (ordinalNumber === "plural") {
                          if (caseType === "accusative") {
                            number = ordinalNumbers[ordinalType].plural.accusative as AccusativeForm
                          } else {
                            number = ordinalNumbers[ordinalType].plural[caseType] as string
                          }
                        } else {
                          if (caseType === "accusative" && ordinalGender === "masculine") {
                            number = ordinalNumbers[ordinalType][ordinalGender].accusative as AccusativeForm
                          } else {
                            number = ordinalNumbers[ordinalType][ordinalGender][caseType] as string
                          }
                        }

                        // Safely access example data
                        if (ordinalExamples[ordinalType] && ordinalExamples[ordinalType][ordinalGender]) {
                          example = ordinalExamples[ordinalType][ordinalGender][caseType]
                        }
                      }
                    } catch (error) {
                      console.error("Error accessing ordinal data:", error)
                      number = "—"
                      example = "—"
                    }

                    const key = `${caseType}_ordinal`
                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "ordinal")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : typeof number === "object" && number.animate && number.inanimate ? (
                            <>
                              <div>
                                <div className="text-sm font-medium">Inanimate:</div>
                                <div className="font-medium text-lg">{number.inanimate}</div>
                              </div>
                              <div className="mt-2">
                                <div className="text-sm font-medium">Animate:</div>
                                <div className="font-medium text-lg">{number.animate}</div>
                              </div>
                            </>
                          ) : (
                            <div className="font-medium text-lg">{number}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>
                            {!hiddenEndings[key] && (
                              <div className="text-sm">
                                {typeof example === "object" && example?.animate && example?.inanimate ? (
                                  <>
                                    <div>Inanimate: {example.inanimate}</div>
                                    <div>Animate: {example.animate}</div>
                                  </>
                                ) : (
                                  example
                                )}
                              </div>
                            )}
                          </TableCell>
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

  // Enhance the collective number table with more options
  // Replace the renderCollectiveNumberTable function with this improved version:

  // Render the collective number table
  const renderCollectiveNumberTable = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Collective Number Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={collectiveType === "oba" || collectiveType === "obe" ? "default" : "outline"}
                  onClick={() => {
                    if (collectiveGender === "feminine") {
                      setCollectiveType("obe")
                    } else {
                      setCollectiveType("oba")
                      setCollectiveGender("masculine")
                    }
                  }}
                  size="sm"
                >
                  Оба/Обе (Both)
                </Button>
                <Button
                  variant={collectiveType === "dvoe" ? "default" : "outline"}
                  onClick={() => setCollectiveType("dvoe")}
                  size="sm"
                >
                  Двое (2)
                </Button>
                <Button
                  variant={collectiveType === "troe" ? "default" : "outline"}
                  onClick={() => setCollectiveType("troe")}
                  size="sm"
                >
                  Трое (3)
                </Button>
                <Button
                  variant={collectiveType === "chetvero" ? "default" : "outline"}
                  onClick={() => setCollectiveType("chetvero")}
                  size="sm"
                >
                  Четверо (4)
                </Button>
                <Button
                  variant={collectiveType === "pyatero" ? "default" : "outline"}
                  onClick={() => setCollectiveType("pyatero")}
                  size="sm"
                >
                  Пятеро (5)
                </Button>
                <Button
                  variant={collectiveType === "shestero" ? "default" : "outline"}
                  onClick={() => setCollectiveType("shestero")}
                  size="sm"
                >
                  Шестеро (6)
                </Button>
                <Button
                  variant={collectiveType === "semero" ? "default" : "outline"}
                  onClick={() => setCollectiveType("semero")}
                  size="sm"
                >
                  Семеро (7)
                </Button>
                <Button
                  variant={collectiveType === "vosemero" ? "default" : "outline"}
                  onClick={() => setCollectiveType("vosemero")}
                  size="sm"
                >
                  Восьмеро (8)
                </Button>
                <Button
                  variant={collectiveType === "desyatero" ? "default" : "outline"}
                  onClick={() => setCollectiveType("desyatero")}
                  size="sm"
                >
                  Десятеро (10)
                </Button>
              </div>
            </CardContent>
          </Card>

          {(collectiveType === "oba" || collectiveType === "obe") && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Gender</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={collectiveType === "oba" && collectiveGender === "masculine" ? "default" : "outline"}
                    onClick={() => {
                      setCollectiveType("oba")
                      setCollectiveGender("masculine")
                    }}
                    size="sm"
                  >
                    Masculine (он)
                  </Button>
                  <Button
                    variant={collectiveType === "obe" ? "default" : "outline"}
                    onClick={() => {
                      setCollectiveType("obe")
                      setCollectiveGender("feminine")
                    }}
                    size="sm"
                  >
                    Feminine (она)
                  </Button>
                  <Button
                    variant={collectiveType === "oba" && collectiveGender === "neuter" ? "default" : "outline"}
                    onClick={() => {
                      setCollectiveType("oba")
                      setCollectiveGender("neuter")
                    }}
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
              <CardTitle className="text-lg">Usage Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Collective numerals are used with:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  Male persons: <span className="font-medium">двое мужчин</span> (two men)
                </li>
                <li>
                  Children: <span className="font-medium">трое детей</span> (three children)
                </li>
                <li>
                  Plural-only nouns: <span className="font-medium">двое суток</span> (two days)
                </li>
                <li>
                  Paired items: <span className="font-medium">двое ножниц</span> (two pairs of scissors)
                </li>
              </ul>
              <p className="mt-2">
                <strong>Оба/Обе</strong> (both) are special collective numerals:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>
                  <strong>Оба</strong> is used with masculine and neuter nouns
                </li>
                <li>
                  <strong>Обе</strong> is used with feminine nouns
                </li>
                <li>Unlike other collective numerals, they can be used with nouns of all genders</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {collectiveType === "oba"
                ? collectiveGender === "masculine"
                  ? "Оба (Both - Masculine)"
                  : "Оба (Both - Neuter)"
                : collectiveType === "obe"
                  ? "Обе (Both - Feminine)"
                  : collectiveType === "dvoe"
                    ? "Двое (2)"
                    : collectiveType === "troe"
                      ? "Трое (3)"
                      : collectiveType === "chetvero"
                        ? "Четверо (4)"
                        : collectiveType === "pyatero"
                          ? "Пятеро (5)"
                          : collectiveType === "shestero"
                            ? "Шестеро (6)"
                            : collectiveType === "semero"
                              ? "Семеро (7)"
                              : collectiveType === "vosemero"
                                ? "Восьмеро (8)"
                                : "Десятеро (10)"}
            </CardTitle>
            <CardDescription>Collective number declension across cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Case</TableHead>
                    <TableHead>Number</TableHead>
                    {showExamples && <TableHead>Example</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseType) => {
                    let number: string | AccusativeForm = ""
                    let example: string | AccusativeForm | undefined = ""

                    try {
                      if (collectiveType === "oba" || collectiveType === "obe") {
                        if (collectiveType === "oba") {
                          if (caseType === "accusative") {
                            number = collectiveNumbers.oba[collectiveGender].accusative as AccusativeForm
                          } else {
                            number = collectiveNumbers.oba[collectiveGender][caseType] as string
                          }
                          example = collectiveExamples.oba[collectiveGender][caseType]
                        } else {
                          // obe
                          if (caseType === "accusative") {
                            number = collectiveNumbers.obe.feminine.accusative
                          } else {
                            number = collectiveNumbers.obe.feminine[caseType] as string
                          }
                          example = collectiveExamples.obe.feminine[caseType]
                        }
                      } else {
                        if (caseType === "accusative") {
                          number = collectiveNumbers[collectiveType].accusative as AccusativeForm
                        } else {
                          number = collectiveNumbers[collectiveType][caseType] as string
                        }

                        // Safely access example data
                        if (collectiveExamples[collectiveType]) {
                          example = collectiveExamples[collectiveType][caseType]
                        }
                      }
                    } catch (error) {
                      console.error("Error accessing collective data:", error)
                      number = "—"
                      example = "—"
                    }

                    const key = `${caseType}_collective`
                    return (
                      <TableRow key={caseType}>
                        <TableCell className="font-medium">
                          {caseTranslations[caseType]}
                          <div className="text-xs text-muted-foreground">{caseType}</div>
                        </TableCell>
                        <TableCell
                          onClick={() => toggleEndingVisibility(caseType, "collective")}
                          className={testMode ? "cursor-pointer hover:bg-muted" : ""}
                        >
                          {hiddenEndings[key] ? (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Eye size={14} className="mr-1" /> Show
                            </Button>
                          ) : typeof number === "object" && number.animate && number.inanimate ? (
                            <>
                              <div>
                                <div className="text-sm font-medium">Inanimate:</div>
                                <div className="font-medium text-lg">{number.inanimate}</div>
                              </div>
                              <div className="mt-2">
                                <div className="text-sm font-medium">Animate:</div>
                                <div className="font-medium text-lg">{number.animate}</div>
                              </div>
                            </>
                          ) : (
                            <div className="font-medium text-lg">{number}</div>
                          )}
                        </TableCell>
                        {showExamples && (
                          <TableCell>
                            {!hiddenEndings[key] && (
                              <div className="text-sm">
                                {typeof example === "object" && example?.animate && example?.inanimate ? (
                                  <>
                                    <div>Inanimate: {example.inanimate}</div>
                                    <div>Animate: {example.animate}</div>
                                  </>
                                ) : (
                                  example
                                )}
                              </div>
                            )}
                          </TableCell>
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
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button
            variant={numberType === "cardinal" ? "default" : "outline"}
            onClick={() => setNumberType("cardinal")}
            className="w-full"
          >
            Cardinal Numbers
          </Button>
          <Button
            variant={numberType === "ordinal" ? "default" : "outline"}
            onClick={() => setNumberType("ordinal")}
            className="w-full"
          >
            Ordinal Numbers
          </Button>
          <Button
            variant={numberType === "collective" ? "default" : "outline"}
            onClick={() => setNumberType("collective")}
            className="w-full"
          >
            Collective Numbers
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

        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              About Russian Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <p>
                <strong>Cardinal numbers</strong> (количественные числительные) indicate quantity (один, два, три).
              </p>
              <p>
                <strong>Ordinal numbers</strong> (порядковые числительные) indicate order or sequence (первый, второй,
                третий).
              </p>
              <p>
                <strong>Collective numbers</strong> (собирательные числительные) are used with certain groups of people
                or objects (двое, трое, четверо). They are typically used with:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Groups of male persons (двое мужчин - two men)</li>
                <li>Children and young animals (трое детей - three children)</li>
                <li>Paired items (двое ножниц - two pairs of scissors)</li>
                <li>Some plural-only nouns (двое суток - two days)</li>
              </ul>
              <p>
                Russian numbers decline based on case, and some also change based on gender. The number 1 (один) and all
                ordinal numbers behave like adjectives, agreeing with the noun they modify in gender, number, and case.
              </p>
              <p>
                Numbers 2-4 have special rules: they require the noun to be in the genitive singular, while 5+ require
                the genitive plural.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Keep the Tabs and TabsContent components for content switching */}
        <Tabs value={numberType} onValueChange={(value) => setNumberType(value as NumberType)}>
          <TabsContent value="cardinal">{renderCardinalNumberTable()}</TabsContent>
          <TabsContent value="ordinal">{renderOrdinalNumberTable()}</TabsContent>
          <TabsContent value="collective">{renderCollectiveNumberTable()}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

