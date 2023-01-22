# Node API 1 Proje Başlangıç Kodu

## Giriş

- RESTful API oluşturma.
- CRUD operasyonları tanımlama.
- API uç noktaları oluşturma.

## Talimatlar

### Görev 1: Project Kurulumu

Bu projeyi forkladıktan sonra bilgisayarınıza klonlayın.

### Görev 2: MVP

Node.js ve Express i kullanarak kullanıcılar üzerinde CRUD işlemleri çalıştıran bir API yaratın.

- API'yi `nodemon` kullanarak çalıştıran `package.json` dosyasına bir `server` betiği ekleyin.

### Uç noktaları yazın

Bir Web API oluşturmak ve aşağıdaki _uçnoktaları_ uygulamak için "index.js" ve "api/server.js" içinde gerekli kodu ekleyin:

| Metod  | URL            | Açıklama                                                                                               |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/users     | "İstek gövdesi" (request body) içinde gönderilen bilgileri kullanarak bir kullanıcı oluşturur.         |
| GET    | /api/users     | Kullanıcılar dizisini döndürür.                                                                        |
| GET    | /api/users/:id | Belirtilen "id" ile kullanıcı nesnesini döndürür.                                                      |
| DELETE | /api/users/:id | Belirtilen "id" ile kullanıcıyı kaldırır ve silinen kullanıcıyı döndürür.                              |
| PUT    | /api/users/:id | "İstek gövdesi"nden alınan verileri kullanarak belirtilen "id" ile günceller. Güncel nesneyi döndürür  |

#### Kullanıcı Şeması

Her Kullanıcı _kaynak_ aşağıdaki yapıya uymalıdır (AKA şeması):

```js
{
  id: "a_benzersiz_id", // String, gerekli
  name: "Jane Doe",  // String, gerekli
  bio: "Having fun", // String, gerekli
}
```

#### Veritabanı erişim fonksiyonları

Bunları `api/users/model.js` içinde bulabilirsiniz. Tüm bu fonksiyonlar birer Promise döndürür.

- `find` Kullanıcı listesini çözümler (ya da boş dizi).
- `findById` Bir `id` alır ve bu idli kullanıcıyı çözümler (ya da bu id ye ait kimse yoksa null döndürür).
- `insert` Yeni bir kullanıcı alır `{ name, bio }` ve yeni oluşturulan kullanıcıyı çözümler `{ id, name, bio }`.
- `update` Bir `id` alır ve var olan kullanıcıyı `{ name, bio }` güncel veri ile günceller `{ id, name, bio}` (id yoksa null döndürür).
- `remove` Bir `id` alır ve silinen kullanıcıyı çözümler `{ id, name, bio }`.

#### Uç Nokta Özellikeri

İstemci `/api/users` e `POST` isteği atarsa:

- Request bodyde `name` ya da  `bio` eksikse:

  - HTTP `400` durum kodu (Bad Request).
  - şu JSON'u cevapta döndürür: `{ message: "Lütfen kullanıcı için bir name ve bio sağlayın" }`.

- Eğer _user_ bilgileri geçerliyse:

  - Yeni _user_ i veritabanına kaydedin.
  - HTTP `201` (Created) durum kodu.
  - yeni oluşturulan _kullanıcı nesnesi_ id yi içerecek şekilde döndürün.

- _user_ kaydedilirken hata oluştuysa:
  - HTTP `500` (Server Error) durum kodu cevaplar.
  - Şu JSON'u döndürün: `{ message: "Veritabanına kaydedilirken bir hata oluştu" }`.

İstemci `/api/users` e `GET` isteği atarsa :

- Veritabanından kullanıcılar alınırken hata oluşursa:
  - HTTP `500` kodu yanıtlar.
  - Şu JSON'u döndürür: `{ message: "Kullanıcı bilgileri alınamadı" }`.

İstemci `/api/users/:id` 'e  `GET` isteği yaparsa :

- Eğer _user_ belirtilen `id` mevcut değilse:

  - HTTP `404` (Not Found) yanıtlar.
  - şu JSON'u döndürür: `{ message: "Belirtilen ID'li kullanıcı bulunamadı" }`.

- _user_ veritabanından alınırken bir hata oluşursa:
  - HTTP `500` yanıtlar.
  - şu JSON'u döndürür: `{ message: "Kullanıcı bilgisi alınamadı" }`.

İstemci `/api/users/:id` 'e `DELETE` isteği yaparsa :

- Eğer belirtilen `id` li kullanıcı mevcut değilse:

  - HTTP `404` (Not Found) yanıtlar.
  - şu JSON'u döndürür: `{ message: "Belirtilen ID li kullanıcı bulunamadı" }`.

- Eğer kullanıcı silinirken hata oluşursa:
  - HTTP `500` yanıtlar.
  - şu JSON'u döndürür: `{ message: "Kullanıcı silinemedi" }`.

İstemci `/api/users/:id` 'e  `PUT` isteği atarsa :

- Belirtilen `id` li _user_ yoksa:

  - HTTP `404` (Not Found).
  - şu JSON'u döndürür: `{ message: "Belirtilen ID'li kullanıcı bulunamadı" }`.

- Request bodysinde  `name` ya da `bio` yoksa:

  - HTTP `400` (Bad Request).
  - şu JSON'u döndürür: `{ message: "Lütfen kullanıcı için name ve bio sağlayın" }`.

- _user_ i güncellerken bir hata oluşursa:

  - HTTP `500`.
  - şu JSON'u döndürür: `{ message: "Kullanıcı bilgileri güncellenemedi" }`.

- Eğer kullanıcı varsa ve girilen bilgiler geçerliyse:

  - "istek gövdesi"nde gönderilen yeni bilgileri kullanarak veritabanındaki kullanıcı nesnesini güncelleyin.
  - HTTP `200` (OK).
  - güncellenen _user nesnesini_ döndürür.

#### Önemli Notlar

- Oluşturduğunuz uç noktaları Postman ya da HTTPie ile test edin.  Otomatik testleri çalıştırmak için `npm test`.
- Ek dosyalar oluşturabilirsiniz ancak **mevcut dosyaları veya klasörleri taşımayın veya yeniden adlandırmayın**.
- Ek kitaplıklar yüklemek veya ek komut dosyaları eklemek dışında `package.json` dosyanızı değiştirmeyin. **Mevcut kütüphaneleri güncellemeyin**.
- Uygulamanızda en iyi yöntemleri izlemeniz ve temiz ve profesyonel kodlar yazmanız önemlidir.

### Görev 3: Esnek Görevler

Dikkat, Esnek görevlere başlamadan MVP'yi tamamladığınızdan emin olun. Eğer şüpeliyseniz yeni bir branch oluşturun.

`cors` ara yazılımını etkinleştirmeniz gerekecek:

- `cors` npm modulünü ekleyin: `npm i cors`.
- `server.use(express.json())` arkasına `server.use(cors())` ekleyin.

Yeni bir React uygulaması oluşturun ve sunucunuza bağlayın:

- React uygulaması herhangi bir yerde olabilir, ancak bu proje için onu çözüm klasörü içinde oluşturun.
- API'deki "/api/users" uç noktasına bağlanın ve kullanıcıların listesini gösterin.
- görüntülenen her kullanıcıya onu sunucudan kaldıracak bir silme butonu ekleyin.
- veri eklemek ve güncellemek için formlar ekleyin.
- Kullanıcı listesini uygun gördüğünüz şekilde stilleyin.
