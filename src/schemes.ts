/**
 * СХЕМЫ ДАННЫХ
 */

/**
 * БАЗОВАЯ СХЕМА
 */
export interface IBaseScheme {
  /** Идентификатор записи в БД */
  _id: String

  /** Номер ревизии записи */
  _rev: String

  /** Дата создания */
  created_at: Date

  /** Кем создано */
  created_by?: IUserScheme["name"]

  /** Когда последний раз обновлена запись */
  updated_at?: Date

  /** Кем последний раз обновлена запись */
  updated_by?: IUserScheme["name"]

  /** Строковое представление записи */
  title?: String
}

/**
 * СХЕМА ПОЛЬЗОВАТЕЛЯ
 */
export interface IUserScheme extends IBaseScheme {
  /** 
   * Исключение regex `org\.couchdb\.user:[A-z0-9]+`
   */
  _id: String
  /** логин */
  name: String
  /** Роли пользователя */
  roles: Array<"dispatcherr" | "dit.manager" | "admin">
  /** Тип пользователя */
  type: "admin" | "user"
  /** Телефон */
  phone: String
  /** Управляющая компания */
  company: IForeignObject<ICompanyScheme>

  /** Поля шифрованного пароля */
  password_scheme: "pbkdf2"
  iterations: Number
  derived_key: String
  salt: String
}

/**
 * СХЕМА УПРАВЛЯЮЩЕЙ КОМПАНИИ
 */
export interface ICompanyScheme extends IBaseScheme {
  /** Полное наименование */
  full_title: String
  /** Округ */
  adm_area: IForeignObject<IBaseScheme>
  /** Район */
  rayon: IForeignObject<IBaseScheme>
  /** Адрес */
  address?: String
  /** Должность руководителя */
  chief_position?: String
  /** ФИО руководителя */
  chief_name?: String
  /** Телефон */
  phone?: String
  /** E-mail */
  email?: String
  /** График работы */
  worktime?: {
    /** День недели */
    day: String
    /** Часы */
    hours: String
  }
  homes_quantity: Number
  /** ИНН */
  inn: String
  /** ОГРН */
  ogrn: String
  /** Координаты */
  geo: [String, String]
  /** Идентификатор на портале data.mos.ru*/
  data_mos_ru_id: String
}

/**
 * СХЕМА СОСТОЯНИЯ ЛИФТА
 */
export interface ILiftStatScheme extends IBaseScheme {
  /** Связь с лифтом */
  parent: IForeignObject<IBaseScheme>
  date: Date
  is_open: Boolean
  floor: Number
  is_empty: Boolean
  error: String
}

/** 
 * СХЕМА РЕЛЯЦИОННОЙ ЗАПИСИ 
 */
export interface IForeignObject<IBaseScheme> {
  _id: String
  _rev: String
  title: String
}

/** СХЕМА ЛФИТА */
export interface ILiftScheme extends IBaseScheme {
  /** Ссылка на управляющую компанию */
  parent: IForeignObject<ICompanyScheme>
  /** Номер в группе */
  nid: String
  /** Адрес */
  address: String
  /** Телефон механика */
  mechanic_phone: String
  /** Тип */
  type: "ukl" | "uel" | "otis"
}