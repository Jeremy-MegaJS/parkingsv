-- Synthetic seed for Parking SV. No legacy passwords or real user identities are imported.
-- The four listing records keep their original IDs and non-contact content.
insert into public.users (id,full_name,email,password_hash,profile_picture,phone_number,business_name,user_type,email_verified,email_verified_at,created_at) values
(9,'Propietario Demo 01','propietario.09@demo.parkingsv.test',null,'/parkingsv/default-avatar.jpeg','+503 7000-0009','Parking SV Demo 01','owner',true,now(),now()),
(23,'Propietario Demo 02','propietario.23@demo.parkingsv.test',null,'/parkingsv/default-avatar.jpeg','+503 7000-0023','Parking SV Demo 02','owner',true,now(),now()),
(10,'Cliente Demo 01','cliente.10@demo.parkingsv.test',null,'/parkingsv/default-avatar.jpeg',null,null,'customer',true,now(),now()),
(12,'Cliente Demo 02','cliente.12@demo.parkingsv.test',null,'/parkingsv/default-avatar.jpeg',null,null,'customer',true,now(),now()),
(14,'Cliente Demo 03','cliente.14@demo.parkingsv.test',null,'/parkingsv/default-avatar.jpeg',null,null,'customer',true,now(),now()),
(16,'Cliente Demo 04','cliente.16@demo.parkingsv.test',null,'/parkingsv/default-avatar.jpeg',null,null,'customer',true,now(),now())
on conflict (id) do nothing;

insert into public.locations ("id","department","municipality","street_address","reference_address","waze_link","google_maps_link","latitude","longitude") values
(30,'San Salvador','Soyapango','Calle de Soyapango','Frente a Plaza Mundo','https://embed.waze.com/iframe?zoom=16&lat=13.73694&lon=-89.15139&pin=1','https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31011.901443473358!2d-89.24306062022205!3d13.688887245601492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sEstacionamientos!5e0!3m2!1ses-419!2ssv!4v1754886589077!5m2!1ses-419!2ssv" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',NULL,NULL),
(32,'San Salvador Norte','Ilopango','Lotificación, Vista al lago, calle #530','2 cuadras antes del turicentro','https://embed.waze.com/iframe?zoom=16&lat=13.693871&lon=-89.110246&ct=livemap','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62023.383046366514!2d-89.15247129476393!3d13.690479466061408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6349004fb28f0b%3A0x960bbc794833f089!2sParqueo%20privado!5e0!3m2!1ses-419!2ssv!4v1755183741723!5m2!1ses-419!2ssv" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',NULL,NULL),
(33,'San Salvador Centro','San Salvador Centro','1a calle poniente','Frente a la Plaza Morazán y al lado del teatro nacional','https://embed.waze.com/iframe?zoom=16&lat=13.699476&lon=-89.189897&ct=livemap','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.315184654749!2d-89.1903605!3d13.6993508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6330ea1af5226d%3A0xa709dea0546550dc!2sPlaza%20Moraz%C3%A1n!5e0!3m2!1ses!2ssv!4v1755219457451!5m2!1ses!2ssv',NULL,NULL),
(34,'San Salvador Centro','San Salvador Centro','P.º Gral. Escalón 3700, San Salvador','En Centro comercial Galerías','https://embed.waze.com/iframe?zoom=16&lat=13.702386&lon=-89.229836&ct=livemap','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2657617333275!2d-89.22963081686163!3d13.702347338574203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63303fad9ab3bb%3A0x240bbac4a0987ec7!2sCentro%20Comercial%20Galer%C3%ADas!5e0!3m2!1ses-419!2ssv!4v1755224691560!5m2!1ses-419!2ssv',NULL,NULL)
on conflict do nothing;

insert into public.parking_categories ("id","name","description") values
(1,'Normal','Parqueo estándar con características comunes.'),
(2,'Alta demanda','Alta rotación de vehículos, usualmente en zonas comerciales.'),
(3,'Turístico','Cercano a atracciones turísticas, con servicios para visitantes.'),
(4,'Mixto','Combina alta demanda y características turísticas.'),
(5,'Premium','Servicios exclusivos como valet, seguridad reforzada y comodidades superiores.')
on conflict do nothing;

insert into public.vehicle_types ("id","category_key","category_name","icon","description") values
(1,'moto','Motocicletas','motorcycle','Scooters, motocicletas estándar y grandes'),
(2,'auto_pequeno','Autos Pequeños','car','Sedanes compactos, hatchbacks, subcompactos'),
(3,'auto_mediano','Autos Medianos','car-side','Sedanes familiares, crossovers pequeños'),
(4,'auto_grande','Autos Grandes','car-alt','SUVs medianas, minivans, sedanes ejecutivos'),
(5,'pickup','Pickups/Furgonetas','truck-pickup','Pickups pequeñas/grandes, furgonetas'),
(6,'comercial','Vehículos Comerciales','bus','Microbuses, buses pequeños (15-20 pasajeros)'),
(7,'pesado','Vehículos Pesados','truck','Camiones de carga liviana, volquetas'),
(8,'trailer','Trailers/Remolques','trailer','Remolques pequeños, semirremolques'),
(9,'bici','Bicicletas','bicycle','Bicis, triciclos y uniciclos se incluyen')
on conflict do nothing;

insert into public.services ("id","name","icon") values
(1,'Cámaras','fa-video'),
(2,'Vigilancia','fa-shield-alt'),
(3,'Techo','fa-people-roof'),
(4,'Sanitarios','fa-restroom'),
(5,'Wi-Fi','fa-wifi'),
(6,'Discapacitados','fa-wheelchair'),
(7,'Carwash','fa-car'),
(8,'Gasolinera','fa-gas-pump'),
(9,'Comedor','fa-utensils'),
(10,'Valet','fa-user-tie'),
(11,'Mascotas permitidas','fa-paw'),
(12,'Afiliado con Vivepass','fa-credit-card'),
(13,'Afiliado con BAC Compass','fa-credit-card'),
(14,'Cajero automático (ATM)','fa-money-bill-wave'),
(15,'Carga para autos eléctricos','fa-charging-station'),
(16,'Taller mecánico','fa-tools'),
(17,'iluminación','fa-lightbulb'),
(18,'Futuras mamás','fa-person-pregnant'),
(19,'Espacios para Taxis','fa-taxi'),
(20,'Para vehículos de transporte público','fa-bus-side'),
(21,'Para bicicletas','fa-bycicle'),
(22,'Centro Comercial','fa-cart-shopping'),
(23,'Cargar baterías','fa-car-battery'),
(24,'Inflar llantas','fa-circle'),
(25,'Limpieza de parabrisas','fa-soap'),
(26,'Hotel','fa-hotel'),
(27,'Auto-servicio','truck-fast')
on conflict do nothing;

insert into public.restriction_types ("id","name") values
(7,'No armas cortopunzantes'),
(6,'No armas de fuego'),
(5,'No celulares'),
(3,'No comida'),
(1,'No fumar'),
(8,'No mascotas'),
(2,'No tirar basura'),
(4,'Sólo mayores 18+'),
(9,'¡Parquearse en posición de salida!')
on conflict do nothing;

insert into public.parkings ("id","owner_id","location_id","category_id","name","description","schedule","is_24_7","contact_name","contact_phone","contact_email","status","is_private","access_code","created_at","updated_at") values
(30,9,30,2,'Parqueo Soyapango','El parqueo es un excelente lugar para dejar tu vehículo vigilado y accesible a Plaza Mundo.','[]'::jsonb,true,'Contacto de demostración','+503 7000-0000','contacto@demo.parkingsv.test','activo',false,NULL,'2025-08-11 04:03:12','2025-08-11 04:03:12'),
(32,23,32,4,'Parqueo Centro Ilopango','Este parqueo provee de varias características que te mantienen cómodo durante tu viaje por Apulo, Ilopango, o en el centro donde puedes optar por servicios comerciales. Por el momento mantendremos nuestra promoción de parqueo gratis para autos medianos los fines de semana que sean incluidos en las fechas: 25/12/25 - 31/12/25 con el objetivo de promover la compra de alimentos en nuestro comedor de pupusas con vista al lago de Apulo.','{"lunes":[{"apertura":"07:00","cierre":"09:00"},{"apertura":"12:00","cierre":"05:00"}],"martes":[],"miercoles":[],"jueves":[],"viernes":[],"sabado":[],"domingo":[]}'::jsonb,false,'Contacto de demostración','+503 7000-0000','contacto@demo.parkingsv.test','activo',false,NULL,'2025-08-14 17:19:53','2025-08-14 17:19:53'),
(33,23,33,4,'Parqueo Morazán','Estacionamiento amplio en el extremo este del Centro Histórico, junto al Monumento Morazán. Permite acceso fácil a la zona comercial y universitaria.','{"lunes":[],"martes":[],"miercoles":[],"jueves":[],"viernes":[],"sabado":[],"domingo":[]}'::jsonb,true,'Contacto de demostración','+503 7000-0000','contacto@demo.parkingsv.test','activo',false,NULL,'2025-08-15 01:25:36','2025-08-15 01:25:36'),
(34,23,34,2,'Parqueo Subterráneo – Centro Comercial Galerías','Centro comercial moderno de varios pisos con tiendas alrededor de una majestuosa casa emblemática de 1950. Ofrecemos accesibilidad a personas discapacitadas desde espacios reservados hasta en el acceso a sanitarios. ¡Compra ya en Centro Comercial Galerías!','{"lunes":[{"apertura":"06:00","cierre":"10:00"},{"apertura":"14:00","cierre":"17:00"}],"martes":[{"apertura":"06:00","cierre":"08:00"}],"miercoles":[],"jueves":[],"viernes":[],"sabado":[],"domingo":[]}'::jsonb,false,'Contacto de demostración','+503 7000-0000','contacto@demo.parkingsv.test','activo',false,NULL,'2025-08-15 02:38:46','2025-08-15 02:38:46')
on conflict do nothing;

insert into public.parking_images ("id","parking_id","image_url","sort_order","is_primary","uploaded_at") values
(34,30,'/parkingsv/listings/parking_30_68996b80bac7b.jpg',1,false,'2025-08-11 04:03:12'),
(35,30,'/parkingsv/listings/parking_30_68996b80d0974.jpg',2,false,'2025-08-11 04:03:12'),
(36,30,'/parkingsv/listings/parking_30_68996b80d2b34.jpg',3,true,'2025-08-11 04:03:12'),
(37,30,'/parkingsv/listings/parking_30_68996b80d4529.jpg',4,false,'2025-08-11 04:03:12'),
(38,30,'/parkingsv/listings/parking_30_68996b80d5f64.jpg',5,false,'2025-08-11 04:03:12'),
(39,30,'/parkingsv/listings/parking_30_68996b80d7d5c.jpg',6,false,'2025-08-11 04:03:12'),
(40,32,'/parkingsv/listings/parking_32_689e1aba02453.jpg',1,false,'2025-08-14 17:19:54'),
(41,32,'/parkingsv/listings/parking_32_689e1aba0d796.jpg',2,false,'2025-08-14 17:19:54'),
(42,32,'/parkingsv/listings/parking_32_689e1aba0e98d.jpg',3,false,'2025-08-14 17:19:54'),
(43,32,'/parkingsv/listings/parking_32_689e1aba0f150.jpg',4,false,'2025-08-14 17:19:54'),
(44,32,'/parkingsv/listings/parking_32_689e1aba0f97f.webp',5,true,'2025-08-14 17:19:54'),
(45,33,'/parkingsv/listings/parking_33_689e8c90d98aa.jpg',1,false,'2025-08-15 01:25:36'),
(46,33,'/parkingsv/listings/parking_33_689e8c90f1fe1.jpg',2,false,'2025-08-15 01:25:36'),
(47,33,'/parkingsv/listings/parking_33_689e8c90f29ca.jpg',3,false,'2025-08-15 01:25:36'),
(48,33,'/parkingsv/listings/parking_33_689e8c90f3235.jpg',4,false,'2025-08-15 01:25:36'),
(49,33,'/parkingsv/listings/parking_33_689e8c90f4173.jpg',5,true,'2025-08-15 01:25:37'),
(50,34,'/parkingsv/listings/parking_34_689e9db66238d.webp',1,false,'2025-08-15 02:38:46'),
(51,34,'/parkingsv/listings/parking_34_689e9db663bf9.webp',2,false,'2025-08-15 02:38:46'),
(52,34,'/parkingsv/listings/parking_34_689e9db664e04.webp',3,false,'2025-08-15 02:38:46'),
(53,34,'/parkingsv/listings/parking_34_689e9db666116.jpg',4,true,'2025-08-15 02:38:46'),
(54,34,'/parkingsv/listings/parking_34_689e9db666a52.jpg',5,false,'2025-08-15 02:38:46')
on conflict do nothing;

insert into public.parking_capacities ("parking_id","general_capacity","reservable_capacity","disability_spaces","pregnant_people_spaces","taxi_spaces") values
(30,500,50,20,10,10),
(32,100,NULL,10,0,0),
(33,500,NULL,30,0,0),
(34,200,NULL,20,0,0)
on conflict do nothing;

insert into public.parking_vehicle_capacities ("parking_id","vehicle_type_id","capacity","reservable_vehicle_c") values
(30,1,100,15),
(30,2,300,20),
(30,3,80,15),
(32,1,30,0),
(32,2,50,0),
(32,3,20,0),
(33,1,100,0),
(33,2,100,0),
(33,3,200,0),
(33,4,100,0),
(34,1,50,0),
(34,2,100,0),
(34,7,50,0)
on conflict do nothing;

insert into public.parking_fees ("id","parking_id","vehicle_type_id","fee_type","price","time_unit","applies_to","valid_from","valid_to") values
(15,30,1,'normal',15,'hora','Toda la semana',NULL,NULL),
(16,30,2,'normal',0.5,'minuto','Toda la semana',NULL,NULL),
(17,30,3,'normal',13,'hora','Días laborales',NULL,NULL),
(18,30,3,'evento','Gratis','día','Fines de semana','2025-12-25','2025-12-30'),
(20,32,1,'normal',0.1,'minuto','',NULL,NULL),
(21,32,2,'normal',0.15,'minuto','',NULL,NULL),
(22,32,2,'mensual',35,'mes','',NULL,NULL),
(23,32,3,'evento','Gratis','día','','2025-12-25','2025-12-31'),
(24,33,1,'normal',1,'hora','',NULL,NULL),
(25,33,2,'normal',1,'hora','',NULL,NULL),
(26,33,3,'normal',1,'hora','',NULL,NULL),
(27,33,4,'normal',1,'hora','',NULL,NULL),
(28,33,3,'nocturno',1,'día','',NULL,NULL),
(29,34,7,'normal',10,'día','',NULL,NULL),
(30,34,1,'normal',0.1,'minuto','',NULL,NULL),
(31,34,2,'normal',1.15,'hora','',NULL,NULL),
(32,34,2,'comercial','Gratis','día','',NULL,NULL),
(33,34,1,'comercial','Gratis','día','','2025-12-24','2025-12-31')
on conflict do nothing;

insert into public.parking_services ("parking_id","service_id") values
(30,1),
(30,7),
(30,9),
(30,12),
(30,13),
(30,14),
(30,15),
(30,16),
(32,4),
(32,6),
(32,9),
(32,10),
(32,11),
(32,14),
(32,17),
(33,1),
(33,2),
(33,3),
(33,6),
(33,17),
(34,1),
(34,2),
(34,3),
(34,4),
(34,5),
(34,6),
(34,9),
(34,14),
(34,17)
on conflict do nothing;

insert into public.parking_restrictions ("parking_id","max_height","max_speed") values
(30,30,20),
(32,NULL,15),
(33,2.1,10),
(34,4,10)
on conflict do nothing;

insert into public.parking_restriction_items ("parking_id","restriction_type_id") values
(30,3),
(30,6),
(30,7),
(32,3),
(32,6),
(33,6),
(34,1),
(34,2)
on conflict do nothing;
select setval(pg_get_serial_sequence('public.users','id'),greatest((select max(id) from public.users),1),true);
select setval(pg_get_serial_sequence('public.locations','id'),(select max(id) from public.locations),true);
select setval(pg_get_serial_sequence('public.parking_categories','id'),(select max(id) from public.parking_categories),true);
select setval(pg_get_serial_sequence('public.vehicle_types','id'),(select max(id) from public.vehicle_types),true);
select setval(pg_get_serial_sequence('public.services','id'),(select max(id) from public.services),true);
select setval(pg_get_serial_sequence('public.restriction_types','id'),(select max(id) from public.restriction_types),true);
select setval(pg_get_serial_sequence('public.parkings','id'),(select max(id) from public.parkings),true);
select setval(pg_get_serial_sequence('public.parking_images','id'),(select max(id) from public.parking_images),true);
select setval(pg_get_serial_sequence('public.parking_fees','id'),(select max(id) from public.parking_fees),true);
