/*==============================================================*/
/* Nom de SGBD :  Microsoft SQL Server 2008                     */
/* Date de crÈation :  24/12/2025 9:14:23                       */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_ext') and o.name = 'FK_TRANSFER_Ext_PERSONNE')
alter table Transfert_ext
   drop constraint FK_TRANSFER_Ext_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_ext') and o.name = 'FK_TRANSFER_REFERENCE_LISTE_CO')
alter table Transfert_ext
   drop constraint FK_TRANSFER_REFERENCE_LISTE_CO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_int') and o.name = 'FK_TRANSFER_REFERENCE_LISTE_DE')
alter table Transfert_int
   drop constraint FK_TRANSFER_REFERENCE_LISTE_DE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_int') and o.name = 'FK_TRANSFER_Int_PERSONNE')
alter table Transfert_int
   drop constraint FK_TRANSFER_Int_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('autorisation_col') and o.name = 'FK_AUTORISA_REFERENCE_AUTORISA')
alter table autorisation_col
   drop constraint FK_AUTORISA_REFERENCE_AUTORISA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('autorisation_tb') and o.name = 'FK_AUTORISA_REFERENCE_ROLE')
alter table autorisation_tb
   drop constraint FK_AUTORISA_REFERENCE_ROLE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_blessure') and o.name = 'FK_HISTORIQ_blessure_PERSONNE')
alter table historique_blessure
   drop constraint FK_HISTORIQ_blessure_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_blessure') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_AC')
alter table historique_blessure
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_AC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_carte_militaire') and o.name = 'FK_HISTORIQ_catre_mill_PERSONNE')
alter table historique_carte_militaire
   drop constraint FK_HISTORIQ_catre_mill_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_conge') and o.name = 'FK_HISTORIQ_conge_PERSONNE')
alter table historique_conge
   drop constraint FK_HISTORIQ_conge_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_conge') and o.name = 'FK_HISTORIQ_conge_LISTE_TY')
alter table historique_conge
   drop constraint FK_HISTORIQ_conge_LISTE_TY
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_conge') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_PA')
alter table historique_conge
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_PA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_contrat') and o.name = 'FK_HISTORIQ_REFERENCE_TYPE_CON')
alter table historique_contrat
   drop constraint FK_HISTORIQ_REFERENCE_TYPE_CON
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_contrat') and o.name = 'FK_HISTORIQ_contrat_PERSONNE')
alter table historique_contrat
   drop constraint FK_HISTORIQ_contrat_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_fonction') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_FO')
alter table historique_fonction
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_FO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_fonction') and o.name = 'FK_HISTORIQ_fonc_PERSONNE')
alter table historique_fonction
   drop constraint FK_HISTORIQ_fonc_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_grade') and o.name = 'FK_HISTORIQ_grade_PERSONNE')
alter table historique_grade
   drop constraint FK_HISTORIQ_grade_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_grade') and o.name = 'FK_HISTORIQ_Grade_LISTE_GR')
alter table historique_grade
   drop constraint FK_HISTORIQ_Grade_LISTE_GR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_passport') and o.name = 'FK_HISTORIQ_passport_PERSONNE')
alter table historique_passport
   drop constraint FK_HISTORIQ_passport_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_passport') and o.name = 'FK_HISTORIQ_REFERENCE_TYPE_PAS')
alter table historique_passport
   drop constraint FK_HISTORIQ_REFERENCE_TYPE_PAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_sanction') and o.name = 'FK_HISTORIQ_sanct_PERSONNE')
alter table historique_sanction
   drop constraint FK_HISTORIQ_sanct_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_sanction') and o.name = 'FK_HISTORIQ_REFERENCE_TYPE_SAN')
alter table historique_sanction
   drop constraint FK_HISTORIQ_REFERENCE_TYPE_SAN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_situation') and o.name = 'FK_HISTORIQ_situa_PERSONNE')
alter table historique_situation
   drop constraint FK_HISTORIQ_situa_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_situation') and o.name = 'FK_HISTORIQ_REFERENCE_SITUATIO')
alter table historique_situation
   drop constraint FK_HISTORIQ_REFERENCE_SITUATIO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_validite_service') and o.name = 'FK_HISTORIQ_valid_servi_PERSONNE')
alter table historique_validite_service
   drop constraint FK_HISTORIQ_valid_servi_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_validite_service') and o.name = 'FK_HISTORIQ_ty_val_ser_LISTE_TY')
alter table historique_validite_service
   drop constraint FK_HISTORIQ_ty_val_ser_LISTE_TY
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_diplomes') and o.name = 'FK_HISTORIQ_diplo_PERSONNE')
alter table historiques_diplomes
   drop constraint FK_HISTORIQ_diplo_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_diplomes') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_DI')
alter table historiques_diplomes
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_DI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_diplomes') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_EC')
alter table historiques_diplomes
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_EC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_interruptions') and o.name = 'FK_HISTORIQ_inter_PERSONNE')
alter table historiques_interruptions
   drop constraint FK_HISTORIQ_inter_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_interruptions') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_IN')
alter table historiques_interruptions
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_IN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_medailles_certificats') and o.name = 'FK_HISTORIQ_medail_certif_PERSONNE')
alter table historiques_medailles_certificats
   drop constraint FK_HISTORIQ_medail_certif_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_medailles_certificats') and o.name = 'FK_HISTORIQ_MC_LISTE_ME')
alter table historiques_medailles_certificats
   drop constraint FK_HISTORIQ_MC_LISTE_ME
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_promotion') and o.name = 'FK_HISTORIQ_Promotion_PERSONNE')
alter table historiques_promotion
   drop constraint FK_HISTORIQ_Promotion_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_promotion') and o.name = 'FK_HISTORIQ_REFERENCE_TYPE_PRO')
alter table historiques_promotion
   drop constraint FK_HISTORIQ_REFERENCE_TYPE_PRO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('history_user') and o.name = 'FK_HISTORY__REFERENCE_USERS')
alter table history_user
   drop constraint FK_HISTORY__REFERENCE_USERS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_corge') and o.name = 'FK_LISTE_CO_REFERENCE_LISTE_AR')
alter table liste_corge
   drop constraint FK_LISTE_CO_REFERENCE_LISTE_AR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_corge') and o.name = 'FK_LISTE_CO_brigade_LISTE_BR')
alter table liste_corge
   drop constraint FK_LISTE_CO_brigade_LISTE_BR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_corge') and o.name = 'FK_LISTE_CO_REFERENCE_LISTE_GA')
alter table liste_corge
   drop constraint FK_LISTE_CO_REFERENCE_LISTE_GA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_corge') and o.name = 'FK_LISTE_CO_REFERENCE_LISTE_RE')
alter table liste_corge
   drop constraint FK_LISTE_CO_REFERENCE_LISTE_RE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_delegation') and o.name = 'FK_LISTE_DE_REFERENCE_LISTE_GO')
alter table liste_delegation
   drop constraint FK_LISTE_DE_REFERENCE_LISTE_GO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_departement') and o.name = 'FK_LISTE_DE_REFERENCE_LISTE_DI')
alter table liste_departement
   drop constraint FK_LISTE_DE_REFERENCE_LISTE_DI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_division') and o.name = 'FK_LISTE_DI_REFERENCE_LISTE_CO')
alter table liste_division
   drop constraint FK_LISTE_DI_REFERENCE_LISTE_CO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_ecole') and o.name = 'FK_LISTE_EC_REFERENCE_LISTE_PA')
alter table liste_ecole
   drop constraint FK_LISTE_EC_REFERENCE_LISTE_PA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_grade') and o.name = 'FK_LISTE_GR_REFERENCE_CATEGORI')
alter table liste_grade
   drop constraint FK_LISTE_GR_REFERENCE_CATEGORI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('note_annuelle') and o.name = 'FK_NOTE_ANN_REFERENCE_PERSONNE')
alter table note_annuelle
   drop constraint FK_NOTE_ANN_REFERENCE_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('note_nuit') and o.name = 'FK_NOTE_NUI_REFERENCE_PERSONNE')
alter table note_nuit
   drop constraint FK_NOTE_NUI_REFERENCE_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('note_rendement') and o.name = 'FK_NOTE_REN_REFERENCE_PERSONNE')
alter table note_rendement
   drop constraint FK_NOTE_REN_REFERENCE_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_LISTE_DE')
alter table personnel
   drop constraint FK_PERSONNE_LISTE_DE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_TYPE_REC')
alter table personnel
   drop constraint FK_PERSONNE_TYPE_REC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_LISTE_OR')
alter table personnel
   drop constraint FK_PERSONNE_LISTE_OR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_GROUPE_S')
alter table personnel
   drop constraint FK_PERSONNE_GROUPE_S
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_LISTE_NISco')
alter table personnel
   drop constraint FK_PERSONNE_LISTE_NISco
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('situation_s1') and o.name = 'FK_SITUATIO_s-s1_SITUATIO')
alter table situation_s1
   drop constraint "FK_SITUATIO_s-s1_SITUATIO"
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('situation_s2') and o.name = 'FK_SITUATIO_s1-s2_SITUATIO')
alter table situation_s2
   drop constraint "FK_SITUATIO_s1-s2_SITUATIO"
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('user_cat_grade') and o.name = 'FK_USER_CAT_REFERENCE_USERS')
alter table user_cat_grade
   drop constraint FK_USER_CAT_REFERENCE_USERS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('user_cat_grade') and o.name = 'FK_USER_CAT_REFERENCE_CATEGORI')
alter table user_cat_grade
   drop constraint FK_USER_CAT_REFERENCE_CATEGORI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('usercorge') and o.name = 'FK_USERCORG_REFERENCE_USERS')
alter table usercorge
   drop constraint FK_USERCORG_REFERENCE_USERS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('usercorge') and o.name = 'FK_USERCORG_LISTE_Corge')
alter table usercorge
   drop constraint FK_USERCORG_LISTE_Corge
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('userrole') and o.name = 'FK_USERROLE_REFERENCE_ROLE')
alter table userrole
   drop constraint FK_USERROLE_REFERENCE_ROLE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('userrole') and o.name = 'FK_USERROLE_REFERENCE_USERS')
alter table userrole
   drop constraint FK_USERROLE_REFERENCE_USERS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('users') and o.name = 'FK_USERS_REFERENCE_PERSONNE')
alter table users
   drop constraint FK_USERS_REFERENCE_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('users') and o.name = 'FK_USERS_REFERENCE_USERROLE')
alter table users
   drop constraint FK_USERS_REFERENCE_USERROLE
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Transfert_ext')
            and   type = 'U')
   drop table Transfert_ext
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Transfert_int')
            and   type = 'U')
   drop table Transfert_int
go

if exists (select 1
            from  sysobjects
           where  id = object_id('autorisation_col')
            and   type = 'U')
   drop table autorisation_col
go

if exists (select 1
            from  sysobjects
           where  id = object_id('autorisation_tb')
            and   type = 'U')
   drop table autorisation_tb
go

if exists (select 1
            from  sysobjects
           where  id = object_id('categorie_grade')
            and   type = 'U')
   drop table categorie_grade
go

if exists (select 1
            from  sysobjects
           where  id = object_id('groupe_sanguin')
            and   type = 'U')
   drop table groupe_sanguin
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_blessure')
            and   type = 'U')
   drop table historique_blessure
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_carte_militaire')
            and   type = 'U')
   drop table historique_carte_militaire
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_conge')
            and   type = 'U')
   drop table historique_conge
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_contrat')
            and   type = 'U')
   drop table historique_contrat
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_fonction')
            and   type = 'U')
   drop table historique_fonction
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_grade')
            and   type = 'U')
   drop table historique_grade
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_passport')
            and   type = 'U')
   drop table historique_passport
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_sanction')
            and   type = 'U')
   drop table historique_sanction
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_situation')
            and   type = 'U')
   drop table historique_situation
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historique_validite_service')
            and   type = 'U')
   drop table historique_validite_service
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historiques_diplomes')
            and   type = 'U')
   drop table historiques_diplomes
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historiques_interruptions')
            and   type = 'U')
   drop table historiques_interruptions
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historiques_medailles_certificats')
            and   type = 'U')
   drop table historiques_medailles_certificats
go

if exists (select 1
            from  sysobjects
           where  id = object_id('historiques_promotion')
            and   type = 'U')
   drop table historiques_promotion
go

if exists (select 1
            from  sysobjects
           where  id = object_id('history_user')
            and   type = 'U')
   drop table history_user
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_accident')
            and   type = 'U')
   drop table liste_accident
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_armee')
            and   type = 'U')
   drop table liste_armee
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_brigade')
            and   type = 'U')
   drop table liste_brigade
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_corge')
            and   type = 'U')
   drop table liste_corge
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_delegation')
            and   type = 'U')
   drop table liste_delegation
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_departement')
            and   type = 'U')
   drop table liste_departement
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_diplome')
            and   type = 'U')
   drop table liste_diplome
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_division')
            and   type = 'U')
   drop table liste_division
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_ecole')
            and   type = 'U')
   drop table liste_ecole
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_fonction')
            and   type = 'U')
   drop table liste_fonction
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_garnison')
            and   type = 'U')
   drop table liste_garnison
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_gouvernement')
            and   type = 'U')
   drop table liste_gouvernement
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_grade')
            and   type = 'U')
   drop table liste_grade
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_interruption')
            and   type = 'U')
   drop table liste_interruption
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_medailles_certificats')
            and   type = 'U')
   drop table liste_medailles_certificats
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_niveauScolaire')
            and   type = 'U')
   drop table liste_niveauScolaire
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_origine_recrutement')
            and   type = 'U')
   drop table liste_origine_recrutement
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_pays')
            and   type = 'U')
   drop table liste_pays
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_region')
            and   type = 'U')
   drop table liste_region
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_ty_val_ser')
            and   type = 'U')
   drop table liste_ty_val_ser
go

if exists (select 1
            from  sysobjects
           where  id = object_id('liste_type_conge')
            and   type = 'U')
   drop table liste_type_conge
go

if exists (select 1
            from  sysobjects
           where  id = object_id('note_annuelle')
            and   type = 'U')
   drop table note_annuelle
go

if exists (select 1
            from  sysobjects
           where  id = object_id('note_nuit')
            and   type = 'U')
   drop table note_nuit
go

if exists (select 1
            from  sysobjects
           where  id = object_id('note_rendement')
            and   type = 'U')
   drop table note_rendement
go

if exists (select 1
            from  sysobjects
           where  id = object_id('personnel')
            and   type = 'U')
   drop table personnel
go

if exists (select 1
            from  sysobjects
           where  id = object_id('role')
            and   type = 'U')
   drop table role
go

if exists (select 1
            from  sysobjects
           where  id = object_id('situation')
            and   type = 'U')
   drop table situation
go

if exists (select 1
            from  sysobjects
           where  id = object_id('situation_s1')
            and   type = 'U')
   drop table situation_s1
go

if exists (select 1
            from  sysobjects
           where  id = object_id('situation_s2')
            and   type = 'U')
   drop table situation_s2
go

if exists (select 1
            from  sysobjects
           where  id = object_id('type_contrat')
            and   type = 'U')
   drop table type_contrat
go

if exists (select 1
            from  sysobjects
           where  id = object_id('type_passeport')
            and   type = 'U')
   drop table type_passeport
go

if exists (select 1
            from  sysobjects
           where  id = object_id('type_promotion')
            and   type = 'U')
   drop table type_promotion
go

if exists (select 1
            from  sysobjects
           where  id = object_id('type_recrutement')
            and   type = 'U')
   drop table type_recrutement
go

if exists (select 1
            from  sysobjects
           where  id = object_id('type_sanction')
            and   type = 'U')
   drop table type_sanction
go

if exists (select 1
            from  sysobjects
           where  id = object_id('user_cat_grade')
            and   type = 'U')
   drop table user_cat_grade
go

if exists (select 1
            from  sysobjects
           where  id = object_id('usercorge')
            and   type = 'U')
   drop table usercorge
go

if exists (select 1
            from  sysobjects
           where  id = object_id('userrole')
            and   type = 'U')
   drop table userrole
go

if exists (select 1
            from  sysobjects
           where  id = object_id('users')
            and   type = 'U')
   drop table users
go

/*==============================================================*/
/* Table : Transfert_ext                                        */
/*==============================================================*/
create table Transfert_ext (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_corge           nvarchar(50)         null,
   dt_text              date                 null,
   ref_text             nvarchar(100)        null,
   constraint PK_TRANSFERT_EXT primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·‰ﬁ·… «·Œ«—ÃÌ…',
   'user', @CurrentUser, 'table', 'Transfert_ext'
go

/*==============================================================*/
/* Table : Transfert_int                                        */
/*==============================================================*/
create table Transfert_int (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_depart          nvarchar(50)         null,
   dt_tint              date                 null,
   ref_tint             nvarchar(100)        null,
   constraint PK_TRANSFERT_INT primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·‰ﬁ·… «·œ«Œ·Ì…',
   'user', @CurrentUser, 'table', 'Transfert_int'
go

/*==============================================================*/
/* Table : autorisation_col                                     */
/*==============================================================*/
create table autorisation_col (
   id                   nvarchar(50)         not null,
   aut_id               nvarchar(50)         null,
   code_column          bit                  null,
   "column"             nvarchar(50)         null,
   "add"                bit                  null,
   "update"             bit                  null,
   "delete"             bit                  null,
   "view"               bit                  null,
   constraint PK_AUTORISATION_COL primary key (id)
)
go

/*==============================================================*/
/* Table : autorisation_tb                                      */
/*==============================================================*/
create table autorisation_tb (
   id                   nvarchar(50)         not null,
   role_id              nvarchar(50)         null,
   code_tb              int                  null,
   "table"              nvarchar(50)         null,
   constraint PK_AUTORISATION_TB primary key (id)
)
go

/*==============================================================*/
/* Table : categorie_grade                                      */
/*==============================================================*/
create table categorie_grade (
   id                   nvarchar(50)         not null,
   design_cat_grade     nvarchar(50)         null,
   constraint PK_CATEGORIE_GRADE primary key (id)
)
go

/*==============================================================*/
/* Table : groupe_sanguin                                       */
/*==============================================================*/
create table groupe_sanguin (
   id                   nvarchar(50)         not null,
   design_grou_sang     nvarchar(3)          null,
   constraint PK_GROUPE_SANGUIN primary key (id)
)
go

/*==============================================================*/
/* Table : historique_blessure                                  */
/*==============================================================*/
create table historique_blessure (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   id_acc               nvarchar(50)         null,
   blessure             nvarchar(50)         null,
   date_blessure        date                 null,
   ref_blessure         nvarchar(50)         null,
   constraint PK_HISTORIQUE_BLESSURE primary key (id)
)
go

/*==============================================================*/
/* Table : historique_carte_militaire                           */
/*==============================================================*/
create table historique_carte_militaire (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   num_carte            nvarchar(8)          null,
   date_deb             date                 null,
   date_fin             date                 null,
   constraint PK_HISTORIQUE_CARTE_MILITAIRE primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '»ÿ«ﬁ«  «· ⁄—Ì› «·⁄”ﬂ—Ì…',
   'user', @CurrentUser, 'table', 'historique_carte_militaire'
go

/*==============================================================*/
/* Table : historique_conge                                     */
/*==============================================================*/
create table historique_conge (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_ty_conge        nvarchar(50)         null,
   code_pays            nvarchar(50)         null,
   dtd_conge            date                 null,
   dtf_conge            date                 null,
   adress_conge         nvarchar(100)        null,
   constraint PK_HISTORIQUE_CONGE primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·—Œ’',
   'user', @CurrentUser, 'table', 'historique_conge'
go

/*==============================================================*/
/* Table : historique_contrat                                   */
/*==============================================================*/
create table historique_contrat (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_ty_contrat      nvarchar(50)         null,
   dtd_contrat          date                 null,
   dtf_contrat          date                 null,
   ref_contrat          nvarchar(100)        null,
   constraint PK_HISTORIQUE_CONTRAT primary key (id)
)
go

/*==============================================================*/
/* Table : historique_fonction                                  */
/*==============================================================*/
create table historique_fonction (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_fonct           nvarchar(50)         null,
   ref                  nvarchar(Max)        null,
   dd_fonct             date                 null,
   df_fonct             date                 null,
   constraint PK_HISTORIQUE_FONCTION primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·Œÿÿ «·„ « ·Ì…
   ',
   'user', @CurrentUser, 'table', 'historique_fonction'
go

/*==============================================================*/
/* Table : historique_grade                                     */
/*==============================================================*/
create table historique_grade (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_grade           nvarchar(50)         null,
   dt_grade             date                 null,
   ref_grade            nvarchar(50)         null,
   constraint PK_HISTORIQUE_GRADE primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·— » «·„ « ·Ì…',
   'user', @CurrentUser, 'table', 'historique_grade'
go

/*==============================================================*/
/* Table : historique_passport                                  */
/*==============================================================*/
create table historique_passport (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_typPass         nvarchar(50)         null,
   num_pass             nvarchar(7)          null,
   date_db_pass         date                 null,
   date_fin_pass        date                 null,
   critere              nvarchar(50)         null,
   constraint PK_HISTORIQUE_PASSPORT primary key (id)
)
go

/*==============================================================*/
/* Table : historique_sanction                                  */
/*==============================================================*/
create table historique_sanction (
   id_pers              nvarchar(50)         null,
   code_ty_sanct        nvarchar(50)         null,
   datsanc              datetime             null,
   taux                 int                  null,
   cause                nvarchar(50)         null,
   refsanc              nvarchar(50)         null
)
go

/*==============================================================*/
/* Table : historique_situation                                 */
/*==============================================================*/
create table historique_situation (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_situ2           nvarchar(50)         null,
   dt_situation         datetime             null,
   ref_situation        nvarchar(50)         null,
   constraint PK_HISTORIQUE_SITUATION primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·Ê÷⁄Ì«  «·„ « ·Ì…',
   'user', @CurrentUser, 'table', 'historique_situation'
go

/*==============================================================*/
/* Table : historique_validite_service                          */
/*==============================================================*/
create table historique_validite_service (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_ty_val_ser      nvarchar(50)         null,
   datd_val_ser         date                 null,
   datf_val_ser         date                 null,
   ref_val_ser          nvarchar(50)         null,
   constraint PK_HISTORIQUE_VALIDITE_SERVICE primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·’·ÊÕÌ…',
   'user', @CurrentUser, 'table', 'historique_validite_service'
go

/*==============================================================*/
/* Table : historiques_diplomes                                 */
/*==============================================================*/
create table historiques_diplomes (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_diplome         nvarchar(50)         null,
   code_ecole           nvarchar(50)         null,
   date_diplome         date                 null,
   ref_diplome          nvarchar(50)         null,
   remarques            nvarchar(50)         null,
   constraint PK_HISTORIQUES_DIPLOMES primary key (id)
)
go

/*==============================================================*/
/* Table : historiques_interruptions                            */
/*==============================================================*/
create table historiques_interruptions (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_interr          nvarchar(50)         null,
   dtd_int              date                 null,
   dtf_int              date                 null,
   ref_int              nvarchar(50)         null,
   constraint PK_HISTORIQUES_INTERRUPTIONS primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·≈‰ﬁÿ«⁄« ',
   'user', @CurrentUser, 'table', 'historiques_interruptions'
go

/*==============================================================*/
/* Table : historiques_medailles_certificats                    */
/*==============================================================*/
create table historiques_medailles_certificats (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_medail_certif   nvarchar(50)         null,
   dt_medail_certif     date                 null,
   ref_medail_certif    nvarchar(50)         null,
   constraint PK_HISTORIQUES_MEDAILLES_CERTI primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·√Ê”„… Ê«·‘Â«∆œ',
   'user', @CurrentUser, 'table', 'historiques_medailles_certificats'
go

/*==============================================================*/
/* Table : historiques_promotion                                */
/*==============================================================*/
create table historiques_promotion (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   code_promot          nvarchar(50)         null,
   dtd_promot           date                 null,
   dtf_promot           date                 null,
   ref_promot           nvarchar(50)         null,
   amuse                bit                  null,
   constraint PK_HISTORIQUES_PROMOTION primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«· ‰›Ì·',
   'user', @CurrentUser, 'table', 'historiques_promotion'
go

/*==============================================================*/
/* Table : history_user                                         */
/*==============================================================*/
create table history_user (
   id                   nvarchar(50)         not null,
   use_id               nvarchar(50)         null,
   date_debut           bit                  null,
   date_fin             date                 null,
   status               bit                  null,
   constraint PK_HISTORY_USER primary key (id)
)
go

/*==============================================================*/
/* Table : liste_accident                                       */
/*==============================================================*/
create table liste_accident (
   id                   nvarchar(50)         not null,
   design_accident      nvarchar(50)         null,
   constraint PK_LISTE_ACCIDENT primary key (id)
)
go

/*==============================================================*/
/* Table : liste_armee                                          */
/*==============================================================*/
create table liste_armee (
   id                   nvarchar(50)         not null,
   design_arm           nvarchar(50)         null,
   constraint PK_LISTE_ARMEE primary key (id)
)
go

/*==============================================================*/
/* Table : liste_brigade                                        */
/*==============================================================*/
create table liste_brigade (
   id                   nvarchar(50)         not null,
   design_brigade       nvarchar(50)         null,
   constraint PK_LISTE_BRIGADE primary key (id)
)
go

/*==============================================================*/
/* Table : liste_corge                                          */
/*==============================================================*/
create table liste_corge (
   id                   nvarchar(50)         not null,
   code_arm             nvarchar(50)         null,
   code_brigade         nvarchar(50)         null,
   code_garnison        nvarchar(50)         null,
   code_region          nvarchar(50)         null,
   design_corge         nvarchar(50)         null,
   abrv_corge           nvarchar(50)         null,
   corge_sout           nvarchar(8)          null,
   constraint PK_LISTE_CORGE primary key (id)
)
go

/*==============================================================*/
/* Table : liste_delegation                                     */
/*==============================================================*/
create table liste_delegation (
   id                   nvarchar(50)         not null,
   code_gouver          nvarchar(50)         null,
   design_deleg         nvarchar(50)         null,
   constraint PK_LISTE_DELEGATION primary key (id)
)
go

/*==============================================================*/
/* Table : liste_departement                                    */
/*==============================================================*/
create table liste_departement (
   id                   nvarchar(50)         not null,
   code_div             nvarchar(50)         null,
   design_depart        nvarchar(50)         null,
   constraint PK_LISTE_DEPARTEMENT primary key (id)
)
go

/*==============================================================*/
/* Table : liste_diplome                                        */
/*==============================================================*/
create table liste_diplome (
   id                   nvarchar(50)         not null,
   design_diplome       nvarchar(50)         null,
   type_diplome         nvarchar(50)         null,
   constraint PK_LISTE_DIPLOME primary key (id)
)
go

/*==============================================================*/
/* Table : liste_division                                       */
/*==============================================================*/
create table liste_division (
   id                   nvarchar(50)         not null,
   code_corge           nvarchar(50)         null,
   design_div           nvarchar(50)         null,
   constraint PK_LISTE_DIVISION primary key (id)
)
go

/*==============================================================*/
/* Table : liste_ecole                                          */
/*==============================================================*/
create table liste_ecole (
   id                   nvarchar(50)         not null,
   code_pays            nvarchar(50)         null,
   design_ecole         nvarchar(50)         null,
   constraint PK_LISTE_ECOLE primary key (id)
)
go

/*==============================================================*/
/* Table : liste_fonction                                       */
/*==============================================================*/
create table liste_fonction (
   id                   nvarchar(50)         not null,
   design_fonct         nvarchar(50)         null,
   constraint PK_LISTE_FONCTION primary key (id)
)
go

/*==============================================================*/
/* Table : liste_garnison                                       */
/*==============================================================*/
create table liste_garnison (
   id                   nvarchar(50)         not null,
   design_garnison      nvarchar(50)         null,
   constraint PK_LISTE_GARNISON primary key (id)
)
go

/*==============================================================*/
/* Table : liste_gouvernement                                   */
/*==============================================================*/
create table liste_gouvernement (
   id                   nvarchar(50)         not null,
   design_gouver        nvarchar(50)         null,
   constraint PK_LISTE_GOUVERNEMENT primary key (id)
)
go

/*==============================================================*/
/* Table : liste_grade                                          */
/*==============================================================*/
create table liste_grade (
   id                   nvarchar(50)         not null,
   id_cat_grade         nvarchar(50)         null,
   design_grade         nvarchar(50)         null,
   constraint PK_LISTE_GRADE primary key (id)
)
go

/*==============================================================*/
/* Table : liste_interruption                                   */
/*==============================================================*/
create table liste_interruption (
   id                   nvarchar(50)         not null,
   design_interr        nvarchar(50)         null,
   constraint PK_LISTE_INTERRUPTION primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'ﬁ«∆„… «·≈‰ﬁÿ«⁄« ',
   'user', @CurrentUser, 'table', 'liste_interruption'
go

/*==============================================================*/
/* Table : liste_medailles_certificats                          */
/*==============================================================*/
create table liste_medailles_certificats (
   id                   nvarchar(50)         not null,
   design_medail_certif nvarchar(50)         null,
   type_medail_certif   nvarchar(50)         null,
   aut_medail_certif    nvarchar(50)         null,
   cat_medail_certif    nvarchar(50)         null,
   constraint PK_LISTE_MEDAILLES_CERTIFICATS primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '√‰Ê«⁄ «·√Ê”„… Ê«·‘Â«∆œ',
   'user', @CurrentUser, 'table', 'liste_medailles_certificats'
go

/*==============================================================*/
/* Table : liste_niveauScolaire                                 */
/*==============================================================*/
create table liste_niveauScolaire (
   id                   nvarchar(50)         not null,
   design_niv_sco       nvarchar(50)         null,
   constraint PK_LISTE_NIVEAUSCOLAIRE primary key (id)
)
go

/*==============================================================*/
/* Table : liste_origine_recrutement                            */
/*==============================================================*/
create table liste_origine_recrutement (
   id                   nvarchar(50)         not null,
   design_orig_rec      nvarchar(50)         null,
   constraint PK_LISTE_ORIGINE_RECRUTEMENT primary key (id)
)
go

/*==============================================================*/
/* Table : liste_pays                                           */
/*==============================================================*/
create table liste_pays (
   id                   nvarchar(50)         not null,
   design_pays          nvarchar(50)         null,
   constraint PK_LISTE_PAYS primary key (id)
)
go

/*==============================================================*/
/* Table : liste_region                                         */
/*==============================================================*/
create table liste_region (
   id                   nvarchar(50)         not null,
   design_region        nvarchar(50)         null,
   constraint PK_LISTE_REGION primary key (id)
)
go

/*==============================================================*/
/* Table : liste_ty_val_ser                                     */
/*==============================================================*/
create table liste_ty_val_ser (
   id                   nvarchar(50)         not null,
   design_ty_val_ser    nvarchar(50)         null,
   constraint PK_LISTE_TY_VAL_SER primary key (id)
)
go

/*==============================================================*/
/* Table : liste_type_conge                                     */
/*==============================================================*/
create table liste_type_conge (
   id                   nvarchar(50)         not null,
   design_ty_conge      nvarchar(50)         null,
   constraint PK_LISTE_TYPE_CONGE primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'ﬁ«∆„… «·—Œ’',
   'user', @CurrentUser, 'table', 'liste_type_conge'
go

/*==============================================================*/
/* Table : note_annuelle                                        */
/*==============================================================*/
create table note_annuelle (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   note_annu            real                 null,
   note_annee           int                  null,
   dt_note_annu         date                 null,
   ref_note_annu        nvarchar(50)         null,
   constraint PK_NOTE_ANNUELLE primary key (id)
)
go

/*==============================================================*/
/* Table : note_nuit                                            */
/*==============================================================*/
create table note_nuit (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         not null,
   note_nuit            int                  null,
   dt_note_nuit         date                 null,
   annee_note_nuit      bit                  null,
   trimestre_note_nuit  int                  null,
   ref_note_nuit        nvarchar(50)         null,
   valid_note_nuit      nvarchar(20)         null,
   valid_dgaaf_note_nuit nvarchar(20)         null,
   constraint PK_NOTE_NUIT primary key (id)
)
go

/*==============================================================*/
/* Table : note_rendement                                       */
/*==============================================================*/
create table note_rendement (
   id                   nvarchar(50)         not null,
   id_pers              nvarchar(50)         null,
   note_rend            real                 null,
   dt_note_rend         date                 null,
   annee_note_rend      int                  null,
   semestre_note_rend   int                  null,
   ref_note_rend        nvarchar(50)         null,
   valid_note_rend      nvarchar(20)         null,
   valid_dgaaf_note_rend nvarchar(20)         null,
   constraint PK_NOTE_RENDEMENT primary key (id)
)
go

/*==============================================================*/
/* Table : personnel                                            */
/*==============================================================*/
create table personnel (
   id                   nvarchar(50)         not null,
   matrecr              nvarchar(12)         not null,
   nom                  nvarchar(50)         null,
   pnom                 nvarchar(50)         null,
   ppere                nvarchar(50)         null,
   pgpere               nvarchar(50)         null,
   pnom_mere            nvarchar(50)         null,
   dt_nais              date                 null,
   code_deleg           nvarchar(50)         null,
   code_rec             nvarchar(50)         null,
   code_orig_rec        nvarchar(50)         null,
   code_grou_sang       nvarchar(50)         null,
   code_niv_sco         nvarchar(50)         null,
   ncin                 nvarchar(8)          not null,
   dt_cin               date                 null,
   iu                   nvarchar(10)         not null,
   adress               nvarchar(100)        null,
   tel                  bigint               null,
   dt_enrolement        date                 null,
   ref_enro             nvarchar(100)        null,
   dt_detachement       date                 null,
   ref_deta             nvarchar(100)        null,
   constraint PK_PERSONNEL primary key (id)
)
go

/*==============================================================*/
/* Table : role                                                 */
/*==============================================================*/
create table role (
   id                   nvarchar(50)         not null,
   design_role          nvarchar(50)         null,
   constraint PK_ROLE primary key (id)
)
go

/*==============================================================*/
/* Table : situation                                            */
/*==============================================================*/
create table situation (
   id                   nvarchar(50)         not null,
   design_situ          nvarchar(50)         null,
   constraint PK_SITUATION primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·Ê÷⁄Ì…',
   'user', @CurrentUser, 'table', 'situation'
go

/*==============================================================*/
/* Table : situation_s1                                         */
/*==============================================================*/
create table situation_s1 (
   id                   nvarchar(50)         not null,
   code_situ            nvarchar(50)         null,
   design_situ1         nvarchar(50)         null,
   constraint PK_SITUATION_S1 primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·Ê÷⁄Ì… «·À«‰ÊÌ… 1
   ',
   'user', @CurrentUser, 'table', 'situation_s1'
go

/*==============================================================*/
/* Table : situation_s2                                         */
/*==============================================================*/
create table situation_s2 (
   id                   nvarchar(50)         not null,
   code_situ1           nvarchar(50)         null,
   design_situ2         nvarchar(50)         null,
   constraint PK_SITUATION_S2 primary key (id)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '«·Ê÷⁄Ì… «·À«‰ÊÌ… 2',
   'user', @CurrentUser, 'table', 'situation_s2'
go

/*==============================================================*/
/* Table : type_contrat                                         */
/*==============================================================*/
create table type_contrat (
   id                   nvarchar(50)         not null,
   design_ty_contrat    nvarchar(100)        null,
   constraint PK_TYPE_CONTRAT primary key (id)
)
go

/*==============================================================*/
/* Table : type_passeport                                       */
/*==============================================================*/
create table type_passeport (
   id                   nvarchar(50)         not null,
   design_typPass       nvarchar(50)         null,
   duree_pass           nvarchar(50)         null,
   constraint PK_TYPE_PASSEPORT primary key (id)
)
go

/*==============================================================*/
/* Table : type_promotion                                       */
/*==============================================================*/
create table type_promotion (
   id                   nvarchar(50)         not null,
   design_promot        nvarchar(50)         null,
   constraint PK_TYPE_PROMOTION primary key (id)
)
go

/*==============================================================*/
/* Table : type_recrutement                                     */
/*==============================================================*/
create table type_recrutement (
   id                   nvarchar(50)         not null,
   design_rec           nvarchar(50)         null,
   abrv_rec             nvarchar(50)         null,
   constraint PK_TYPE_RECRUTEMENT primary key (id)
)
go

/*==============================================================*/
/* Table : type_sanction                                        */
/*==============================================================*/
create table type_sanction (
   id                   nvarchar(50)         not null,
   design_ty_sanct      nvarchar(50)         null,
   constraint PK_TYPE_SANCTION primary key (id)
)
go

/*==============================================================*/
/* Table : user_cat_grade                                       */
/*==============================================================*/
create table user_cat_grade (
   id                   nvarchar(50)         not null,
   cat_id               nvarchar(50)         null,
   use_id               nvarchar(50)         null,
   constraint PK_USER_CAT_GRADE primary key (id)
)
go

/*==============================================================*/
/* Table : usercorge                                            */
/*==============================================================*/
create table usercorge (
   id                   nvarchar(50)         not null,
   use_id               nvarchar(50)         null,
   code_corge           nvarchar(50)         null,
   constraint PK_USERCORGE primary key (id)
)
go

/*==============================================================*/
/* Table : userrole                                             */
/*==============================================================*/
create table userrole (
   id                   nvarchar(50)         not null,
   user_id              nvarchar(50)         null,
   id_role              nvarchar(50)         null,
   constraint PK_USERROLE primary key (id)
)
go

/*==============================================================*/
/* Table : users                                                */
/*==============================================================*/
create table users (
   id                   nvarchar(50)         not null,
   per_id               nvarchar(50)         null,
   password             nvarchar(50)         null,
   statut               bit                  null,
   constraint PK_USERS primary key (id)
)
go

alter table Transfert_ext
   add constraint FK_TRANSFER_Ext_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table Transfert_ext
   add constraint FK_TRANSFER_REFERENCE_LISTE_CO foreign key (code_corge)
      references liste_corge (id)
go

alter table Transfert_int
   add constraint FK_TRANSFER_REFERENCE_LISTE_DE foreign key (code_depart)
      references liste_departement (id)
go

alter table Transfert_int
   add constraint FK_TRANSFER_Int_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table autorisation_col
   add constraint FK_AUTORISA_REFERENCE_AUTORISA foreign key (aut_id)
      references autorisation_tb (id)
go

alter table autorisation_tb
   add constraint FK_AUTORISA_REFERENCE_ROLE foreign key (role_id)
      references role (id)
go

alter table historique_blessure
   add constraint FK_HISTORIQ_blessure_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_blessure
   add constraint FK_HISTORIQ_REFERENCE_LISTE_AC foreign key (id_acc)
      references liste_accident (id)
go

alter table historique_carte_militaire
   add constraint FK_HISTORIQ_catre_mill_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_conge
   add constraint FK_HISTORIQ_conge_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_conge
   add constraint FK_HISTORIQ_conge_LISTE_TY foreign key (code_ty_conge)
      references liste_type_conge (id)
go

alter table historique_conge
   add constraint FK_HISTORIQ_REFERENCE_LISTE_PA foreign key (code_pays)
      references liste_pays (id)
go

alter table historique_contrat
   add constraint FK_HISTORIQ_REFERENCE_TYPE_CON foreign key (code_ty_contrat)
      references type_contrat (id)
go

alter table historique_contrat
   add constraint FK_HISTORIQ_contrat_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_fonction
   add constraint FK_HISTORIQ_REFERENCE_LISTE_FO foreign key (code_fonct)
      references liste_fonction (id)
go

alter table historique_fonction
   add constraint FK_HISTORIQ_fonc_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_grade
   add constraint FK_HISTORIQ_grade_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_grade
   add constraint FK_HISTORIQ_Grade_LISTE_GR foreign key (code_grade)
      references liste_grade (id)
go

alter table historique_passport
   add constraint FK_HISTORIQ_passport_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_passport
   add constraint FK_HISTORIQ_REFERENCE_TYPE_PAS foreign key (code_typPass)
      references type_passeport (id)
go

alter table historique_sanction
   add constraint FK_HISTORIQ_sanct_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_sanction
   add constraint FK_HISTORIQ_REFERENCE_TYPE_SAN foreign key (code_ty_sanct)
      references type_sanction (id)
go

alter table historique_situation
   add constraint FK_HISTORIQ_situa_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_situation
   add constraint FK_HISTORIQ_REFERENCE_SITUATIO foreign key (code_situ2)
      references situation_s2 (id)
go

alter table historique_validite_service
   add constraint FK_HISTORIQ_valid_servi_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historique_validite_service
   add constraint FK_HISTORIQ_ty_val_ser_LISTE_TY foreign key (code_ty_val_ser)
      references liste_ty_val_ser (id)
go

alter table historiques_diplomes
   add constraint FK_HISTORIQ_diplo_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historiques_diplomes
   add constraint FK_HISTORIQ_REFERENCE_LISTE_DI foreign key (code_diplome)
      references liste_diplome (id)
go

alter table historiques_diplomes
   add constraint FK_HISTORIQ_REFERENCE_LISTE_EC foreign key (code_ecole)
      references liste_ecole (id)
go

alter table historiques_interruptions
   add constraint FK_HISTORIQ_inter_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historiques_interruptions
   add constraint FK_HISTORIQ_REFERENCE_LISTE_IN foreign key (code_interr)
      references liste_interruption (id)
go

alter table historiques_medailles_certificats
   add constraint FK_HISTORIQ_medail_certif_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historiques_medailles_certificats
   add constraint FK_HISTORIQ_MC_LISTE_ME foreign key (code_medail_certif)
      references liste_medailles_certificats (id)
go

alter table historiques_promotion
   add constraint FK_HISTORIQ_Promotion_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table historiques_promotion
   add constraint FK_HISTORIQ_REFERENCE_TYPE_PRO foreign key (code_promot)
      references type_promotion (id)
go

alter table history_user
   add constraint FK_HISTORY__REFERENCE_USERS foreign key (use_id)
      references users (id)
go

alter table liste_corge
   add constraint FK_LISTE_CO_REFERENCE_LISTE_AR foreign key (code_arm)
      references liste_armee (id)
go

alter table liste_corge
   add constraint FK_LISTE_CO_brigade_LISTE_BR foreign key (code_brigade)
      references liste_brigade (id)
go

alter table liste_corge
   add constraint FK_LISTE_CO_REFERENCE_LISTE_GA foreign key (code_garnison)
      references liste_garnison (id)
go

alter table liste_corge
   add constraint FK_LISTE_CO_REFERENCE_LISTE_RE foreign key (code_region)
      references liste_region (id)
go

alter table liste_delegation
   add constraint FK_LISTE_DE_REFERENCE_LISTE_GO foreign key (code_gouver)
      references liste_gouvernement (id)
go

alter table liste_departement
   add constraint FK_LISTE_DE_REFERENCE_LISTE_DI foreign key (code_div)
      references liste_division (id)
go

alter table liste_division
   add constraint FK_LISTE_DI_REFERENCE_LISTE_CO foreign key (code_corge)
      references liste_corge (id)
go

alter table liste_ecole
   add constraint FK_LISTE_EC_REFERENCE_LISTE_PA foreign key (code_pays)
      references liste_pays (id)
go

alter table liste_grade
   add constraint FK_LISTE_GR_REFERENCE_CATEGORI foreign key (id_cat_grade)
      references categorie_grade (id)
go

alter table note_annuelle
   add constraint FK_NOTE_ANN_REFERENCE_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table note_nuit
   add constraint FK_NOTE_NUI_REFERENCE_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table note_rendement
   add constraint FK_NOTE_REN_REFERENCE_PERSONNE foreign key (id_pers)
      references personnel (id)
go

alter table personnel
   add constraint FK_PERSONNE_LISTE_DE foreign key (code_deleg)
      references liste_delegation (id)
go

alter table personnel
   add constraint FK_PERSONNE_TYPE_REC foreign key (code_rec)
      references type_recrutement (id)
go

alter table personnel
   add constraint FK_PERSONNE_LISTE_OR foreign key (code_orig_rec)
      references liste_origine_recrutement (id)
go

alter table personnel
   add constraint FK_PERSONNE_GROUPE_S foreign key (code_grou_sang)
      references groupe_sanguin (id)
go

alter table personnel
   add constraint FK_PERSONNE_LISTE_NISco foreign key (code_niv_sco)
      references liste_niveauScolaire (id)
go

alter table situation_s1
   add constraint "FK_SITUATIO_s-s1_SITUATIO" foreign key (code_situ)
      references situation (id)
go

alter table situation_s2
   add constraint "FK_SITUATIO_s1-s2_SITUATIO" foreign key (code_situ1)
      references situation_s1 (id)
go

alter table user_cat_grade
   add constraint FK_USER_CAT_REFERENCE_USERS foreign key (use_id)
      references users (id)
go

alter table user_cat_grade
   add constraint FK_USER_CAT_REFERENCE_CATEGORI foreign key (cat_id)
      references categorie_grade (id)
go

alter table usercorge
   add constraint FK_USERCORG_REFERENCE_USERS foreign key (use_id)
      references users (id)
go

alter table usercorge
   add constraint FK_USERCORG_LISTE_Corge foreign key (code_corge)
      references liste_corge (id)
go

alter table userrole
   add constraint FK_USERROLE_REFERENCE_ROLE foreign key (id_role)
      references role (id)
go

alter table userrole
   add constraint FK_USERROLE_REFERENCE_USERS foreign key (user_id)
      references users (id)
go

alter table users
   add constraint FK_USERS_REFERENCE_PERSONNE foreign key (per_id)
      references personnel (id)
go

alter table users
   add constraint FK_USERS_REFERENCE_USERROLE foreign key (id)
      references userrole (id)
go

