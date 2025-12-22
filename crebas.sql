/*==============================================================*/
/* Nom de SGBD :  Microsoft SQL Server 2008                     */
/* Date de crÈation :  22/12/2025 13:52:58                      */
/*==============================================================*/


if exists (select 1
          from sysobjects
          where id = object_id('"CLR Trigger_historique_fonction"')
          and type = 'TR')
   drop trigger "CLR Trigger_historique_fonction"
go

if exists (select 1
          from sysobjects
          where id = object_id('"CLR Trigger_personnel"')
          and type = 'TR')
   drop trigger "CLR Trigger_personnel"
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_ext') and o.name = 'FK_TRANSFER_REFERENCE_LISTE_CO')
alter table Transfert_ext
   drop constraint FK_TRANSFER_REFERENCE_LISTE_CO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_ext') and o.name = 'FK_TRANSFER_Trans_Ext_PERSONNE')
alter table Transfert_ext
   drop constraint FK_TRANSFER_Trans_Ext_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_int') and o.name = 'FK_TRANSFER_Trans_Int_PERSONNE')
alter table Transfert_int
   drop constraint FK_TRANSFER_Trans_Int_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_int') and o.name = 'FK_TRANSFER_REFERENCE_LISTE_DE')
alter table Transfert_int
   drop constraint FK_TRANSFER_REFERENCE_LISTE_DE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('Transfert_int') and o.name = 'FK_TRANSFER_TransInt_PERSONNE')
alter table Transfert_int
   drop constraint FK_TRANSFER_TransInt_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_blessure') and o.name = 'FK_HISTORIQ_bless_PERSONNE')
alter table historique_blessure
   drop constraint FK_HISTORIQ_bless_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_blessure') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_AC')
alter table historique_blessure
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_AC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_blessure') and o.name = 'FK_HISTORIQ_blessu_PERSONNE')
alter table historique_blessure
   drop constraint FK_HISTORIQ_blessu_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_carte_militaire') and o.name = 'FK_HISTORIQ_carteMili_PERSONNE')
alter table historique_carte_militaire
   drop constraint FK_HISTORIQ_carteMili_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_conge') and o.name = 'FK_HISTORIQ_conge_PERSONNE')
alter table historique_conge
   drop constraint FK_HISTORIQ_conge_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_conge') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_PA')
alter table historique_conge
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_PA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_conge') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_TY')
alter table historique_conge
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_TY
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
   where r.fkeyid = object_id('historique_fonction') and o.name = 'FK_personnel_historique_fonction_id_personnel')
alter table historique_fonction
   drop constraint FK_personnel_historique_fonction_id_personnel
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_grade') and o.name = 'FK_HISTORIQ_grade_PERSONNE')
alter table historique_grade
   drop constraint FK_HISTORIQ_grade_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_grade') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_GR')
alter table historique_grade
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_GR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_passport') and o.name = 'FK_HISTORIQ_REFERENCE_TYPE_PAS')
alter table historique_passport
   drop constraint FK_HISTORIQ_REFERENCE_TYPE_PAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_passport') and o.name = 'FK_HISTORIQ_passport_PERSONNE')
alter table historique_passport
   drop constraint FK_HISTORIQ_passport_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_sanction') and o.name = 'FK_HISTORIQ_REFERENCE_TYPE_SAN')
alter table historique_sanction
   drop constraint FK_HISTORIQ_REFERENCE_TYPE_SAN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_sanction') and o.name = 'FK_HISTORIQ_sanction_PERSONNE')
alter table historique_sanction
   drop constraint FK_HISTORIQ_sanction_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_situation') and o.name = 'FK_HISTORIQ_situation_PERSONNE')
alter table historique_situation
   drop constraint FK_HISTORIQ_situation_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_situation') and o.name = 'FK_HISTORIQ_REFERENCE_SITUATIO')
alter table historique_situation
   drop constraint FK_HISTORIQ_REFERENCE_SITUATIO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_validite_service') and o.name = 'FK_HISTORIQ_valid_serv_PERSONNE')
alter table historique_validite_service
   drop constraint FK_HISTORIQ_valid_serv_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historique_validite_service') and o.name = 'FK_HISTORIQ_valid_serv_LISTE_TY')
alter table historique_validite_service
   drop constraint FK_HISTORIQ_valid_serv_LISTE_TY
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_diplomes') and o.name = 'FK_HISTORIQ_diplo_PERSONNE1')
alter table historiques_diplomes
   drop constraint FK_HISTORIQ_diplo_PERSONNE1
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
   where r.fkeyid = object_id('historiques_interruptions') and o.name = 'FK_HISTORIQ_interrup_PERSONNE')
alter table historiques_interruptions
   drop constraint FK_HISTORIQ_interrup_PERSONNE
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
   where r.fkeyid = object_id('historiques_medailles_certificats') and o.name = 'FK_HISTORIQ_REFERENCE_LISTE_ME')
alter table historiques_medailles_certificats
   drop constraint FK_HISTORIQ_REFERENCE_LISTE_ME
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('historiques_promotion') and o.name = 'FK_HISTORIQ_promotion_PERSONNE')
alter table historiques_promotion
   drop constraint FK_HISTORIQ_promotion_PERSONNE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('liste_corge') and o.name = 'FK_LISTE_CO_REFERENCE_LISTE_BR')
alter table liste_corge
   drop constraint FK_LISTE_CO_REFERENCE_LISTE_BR
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
   where r.fkeyid = object_id('liste_corge') and o.name = 'FK_LISTE_CO_REFERENCE_LISTE_AR')
alter table liste_corge
   drop constraint FK_LISTE_CO_REFERENCE_LISTE_AR
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
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_REFERENCE_LISTE_DE')
alter table personnel
   drop constraint FK_PERSONNE_REFERENCE_LISTE_DE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_REFERENCE_LISTE_OR')
alter table personnel
   drop constraint FK_PERSONNE_REFERENCE_LISTE_OR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_REFERENCE_TYPE_REC')
alter table personnel
   drop constraint FK_PERSONNE_REFERENCE_TYPE_REC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_REFERENCE_GROUPE_S')
alter table personnel
   drop constraint FK_PERSONNE_REFERENCE_GROUPE_S
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('personnel') and o.name = 'FK_PERSONNE_REFERENCE_LISTE_NI')
alter table personnel
   drop constraint FK_PERSONNE_REFERENCE_LISTE_NI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('situation_s1') and o.name = 'FK_SITUATIO_s_s1_SITUATIO')
alter table situation_s1
   drop constraint FK_SITUATIO_s_s1_SITUATIO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('situation_s2') and o.name = 'FK_SITUATIO_1-2_SITUATIO')
alter table situation_s2
   drop constraint "FK_SITUATIO_1-2_SITUATIO"
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

/*==============================================================*/
/* Table : Transfert_ext                                        */
/*==============================================================*/
create table Transfert_ext (
   id                   nvarchar(50)         not null,
   code_corge           nvarchar(8)          null,
   dt_text              date                 not null,
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
   per_id               nvarchar(50)         null,
   code_depart          int                  null,
   dt_tint              date                 not null,
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
/* Table : groupe_sanguin                                       */
/*==============================================================*/
create table groupe_sanguin (
   code_grou_sang       int                  not null,
   design_grou_sang     nvarchar(3)          null,
   constraint PK_GROUPE_SANGUIN primary key (code_grou_sang)
)
go

/*==============================================================*/
/* Table : historique_blessure                                  */
/*==============================================================*/
create table historique_blessure (
   id                   nvarchar(50)         not null,
   per_id               nvarchar(50)         null,
   code_accident        int                  null,
   blessure             nvarchar(50)         not null,
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
   num_carte            nvarchar(8)          not null,
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
   code_pays            int                  null,
   code_ty_conge        int                  null,
   dtd_conge            date                 not null,
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
   code_ty_contrat      int                  null,
   dtd_contrat          date                 not null,
   dtf_contrat          date                 null,
   ref_contrat          nvarchar(100)        null
)
go

/*==============================================================*/
/* Table : historique_fonction                                  */
/*==============================================================*/
create table historique_fonction (
   id                   nvarchar(50)         not null,
   code_fonct           int                  null,
   per_id               nvarchar(50)         null,
   ref                  nvarchar(Max)        not null,
   dd_fonct             date                 not null,
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
   code_grade           int                  null,
   dt_grade             date                 null,
   ref_grade            nvarchar(50)         null
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
   code_typPass         int                  null,
   per_id               nvarchar(50)         null,
   num_pass             nvarchar(7)          not null,
   date_db_pass         date                 null,
   date_fin_pass        date                 null,
   critere              nvarchar(0)          null,
   constraint PK_HISTORIQUE_PASSPORT primary key (id)
)
go

/*==============================================================*/
/* Table : historique_sanction                                  */
/*==============================================================*/
create table historique_sanction (
   id                   nvarchar(50)         not null,
   code_ty_sanct        int                  null,
   datsanc              datetime             not null,
   taux                 int                  null,
   cause                nvarchar(50)         null,
   refsanc              nvarchar(50)         null,
   constraint PK_HISTORIQUE_SANCTION primary key (id)
)
go

/*==============================================================*/
/* Table : historique_situation                                 */
/*==============================================================*/
create table historique_situation (
   id                   nvarchar(50)         not null,
   code_situ2           int                  not null,
   dt_situation         datetime             not null,
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
   code_ty_val_ser      bigint               null,
   datd_val_ser         date                 not null,
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
   code_diplome         int                  null,
   code_ecole           int                  null,
   per_id               nvarchar(50)         null,
   date_diplome         date                 not null,
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
   code_interr          int                  null,
   dtd_int              date                 not null,
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
   code_medail_certif   int                  null,
   dt_medail_certif     date                 not null,
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
   code_promot          int                  not null,
   dtd_promot           date                 not null,
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
/* Table : liste_accident                                       */
/*==============================================================*/
create table liste_accident (
   code_accident        int                  not null,
   design_accident      nvarchar(50)         null,
   constraint PK_LISTE_ACCIDENT primary key (code_accident)
)
go

/*==============================================================*/
/* Table : liste_armee                                          */
/*==============================================================*/
create table liste_armee (
   code_arm             int                  not null,
   design_arm           nvarchar(50)         null,
   constraint PK_LISTE_ARMEE primary key (code_arm)
)
go

/*==============================================================*/
/* Table : liste_brigade                                        */
/*==============================================================*/
create table liste_brigade (
   code_brigade         int                  not null,
   design_brigade       nvarchar(50)         null,
   constraint PK_LISTE_BRIGADE primary key (code_brigade)
)
go

/*==============================================================*/
/* Table : liste_corge                                          */
/*==============================================================*/
create table liste_corge (
   code_corge           nvarchar(8)          not null,
   code_brigade         int                  null,
   code_garnison        int                  null,
   code_region          int                  null,
   code_arm             int                  null,
   design_corge         nvarchar(50)         null,
   abrv_corge           nvarchar(50)         null,
   corge_sout           nvarchar(8)          null,
   constraint PK_LISTE_CORGE primary key (code_corge)
)
go

/*==============================================================*/
/* Table : liste_delegation                                     */
/*==============================================================*/
create table liste_delegation (
   code_deleg           int                  not null,
   code_gouver          int                  null,
   design_deleg         nvarchar(50)         null,
   constraint PK_LISTE_DELEGATION primary key (code_deleg)
)
go

/*==============================================================*/
/* Table : liste_departement                                    */
/*==============================================================*/
create table liste_departement (
   code_depart          int                  not null,
   code_div             int                  null,
   design_depart        nvarchar(50)         null,
   constraint PK_LISTE_DEPARTEMENT primary key (code_depart)
)
go

/*==============================================================*/
/* Table : liste_diplome                                        */
/*==============================================================*/
create table liste_diplome (
   code_diplome         int                  not null,
   design_diplome       nvarchar(50)         null,
   type_diplome         nvarchar(50)         null,
   constraint PK_LISTE_DIPLOME primary key (code_diplome)
)
go

/*==============================================================*/
/* Table : liste_division                                       */
/*==============================================================*/
create table liste_division (
   code_div             int                  not null,
   code_corge           nvarchar(8)          null,
   design_div           nvarchar(50)         null,
   constraint PK_LISTE_DIVISION primary key (code_div)
)
go

/*==============================================================*/
/* Table : liste_ecole                                          */
/*==============================================================*/
create table liste_ecole (
   code_ecole           int                  not null,
   code_pays            int                  null,
   design_ecole         nvarchar(50)         null,
   constraint PK_LISTE_ECOLE primary key (code_ecole)
)
go

/*==============================================================*/
/* Table : liste_fonction                                       */
/*==============================================================*/
create table liste_fonction (
   code_fonct           int                  not null,
   design_fonct         nvarchar(50)         null,
   constraint PK_LISTE_FONCTION primary key (code_fonct)
)
go

/*==============================================================*/
/* Table : liste_garnison                                       */
/*==============================================================*/
create table liste_garnison (
   code_garnison        int                  not null,
   design_garnison      nvarchar(50)         null,
   constraint PK_LISTE_GARNISON primary key (code_garnison)
)
go

/*==============================================================*/
/* Table : liste_gouvernement                                   */
/*==============================================================*/
create table liste_gouvernement (
   code_gouver          int                  not null,
   design_gouver        nvarchar(50)         null,
   constraint PK_LISTE_GOUVERNEMENT primary key (code_gouver)
)
go

/*==============================================================*/
/* Table : liste_grade                                          */
/*==============================================================*/
create table liste_grade (
   code_grade           int                  not null,
   design,_grade        nvarchar(50)         null,
   constraint PK_LISTE_GRADE primary key (code_grade)
)
go

/*==============================================================*/
/* Table : liste_interruption                                   */
/*==============================================================*/
create table liste_interruption (
   code_interr          int                  not null,
   design_interr        nvarchar(50)         null,
   constraint PK_LISTE_INTERRUPTION primary key (code_interr)
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
   code_medail_certif   int                  not null,
   design_medail_certif nvarchar(50)         null,
   type_medail_certif   nvarchar(50)         null,
   aut_medail_certif    nvarchar(50)         null,
   cat_medail_certif    nvarchar(50)         null,
   constraint PK_LISTE_MEDAILLES_CERTIFICATS primary key (code_medail_certif)
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
   code_niv_sco         int                  not null,
   design_vniv_sco      nvarchar(50)         null,
   constraint PK_LISTE_NIVEAUSCOLAIRE primary key (code_niv_sco)
)
go

/*==============================================================*/
/* Table : liste_origine_recrutement                            */
/*==============================================================*/
create table liste_origine_recrutement (
   code_orig_rec        int                  not null,
   design_orig_rec      nvarchar(50)         null,
   constraint PK_LISTE_ORIGINE_RECRUTEMENT primary key (code_orig_rec)
)
go

/*==============================================================*/
/* Table : liste_pays                                           */
/*==============================================================*/
create table liste_pays (
   code_pays            int                  not null,
   design_pays          nvarchar(50)         null,
   constraint PK_LISTE_PAYS primary key (code_pays)
)
go

/*==============================================================*/
/* Table : liste_region                                         */
/*==============================================================*/
create table liste_region (
   code_region          int                  not null,
   design_region        nvarchar(50)         null,
   constraint PK_LISTE_REGION primary key (code_region)
)
go

/*==============================================================*/
/* Table : liste_ty_val_ser                                     */
/*==============================================================*/
create table liste_ty_val_ser (
   code_ty_val_ser      bigint               not null,
   design_ty_val_ser    nvarchar(50)         null,
   constraint PK_LISTE_TY_VAL_SER primary key (code_ty_val_ser)
)
go

/*==============================================================*/
/* Table : liste_type_conge                                     */
/*==============================================================*/
create table liste_type_conge (
   code_ty_conge        int                  not null,
   design_ty_conge      nvarchar(50)         null,
   constraint PK_LISTE_TYPE_CONGE primary key (code_ty_conge)
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
   note_annu            real                 null,
   note_annee           int                  not null,
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
   note_n               int                  not null,
   dt_note_nuit         date                 null,
   annee_note_nuit      int                  not null,
   trimestre_note_nuit  int                  not null,
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
   note_rend            real                 null,
   dt_note_rend         date                 null,
   annee_note_rend      int                  not null,
   semestre_note_rend   int                  not null,
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
   code_deleg           int                  null,
   code_orig_rec        int                  null,
   code_rec             int                  null,
   code_grou_sang       int                  null,
   code_niv_sco         int                  null,
   matrecr              nvarchar(12)         not null,
   nom                  nvarchar(50)         null,
   pnom                 nvarchar(50)         null,
   ppere                nvarchar(50)         null,
   pgpere               nvarchar(50)         null,
   pnom_mere            nvarchar(50)         null,
   dt_nais              date                 null,
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
/* Table : situation                                            */
/*==============================================================*/
create table situation (
   code_situ            int                  not null,
   design_situ          nvarchar(50)         null,
   constraint PK_SITUATION primary key (code_situ)
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
   code_situ1           int                  not null,
   code_situ            int                  null,
   design_situ1         nvarchar(50)         null,
   constraint PK_SITUATION_S1 primary key (code_situ1)
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
   code_situ2           int                  not null,
   code_situ1           int                  null,
   design_situ2         nvarchar(50)         null,
   constraint PK_SITUATION_S2 primary key (code_situ2)
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
   code_ty_contrat      int                  not null,
   design_ty_contrat    nvarchar(100)        null,
   constraint PK_TYPE_CONTRAT primary key (code_ty_contrat)
)
go

/*==============================================================*/
/* Table : type_passeport                                       */
/*==============================================================*/
create table type_passeport (
   code_typPass         int                  not null,
   design_typPass       nvarchar(50)         null,
   duree_pass           nvarchar(50)         null,
   constraint PK_TYPE_PASSEPORT primary key (code_typPass)
)
go

/*==============================================================*/
/* Table : type_promotion                                       */
/*==============================================================*/
create table type_promotion (
   code_promot          int                  not null,
   design_promot        nvarchar(50)         null
)
go

/*==============================================================*/
/* Table : type_recrutement                                     */
/*==============================================================*/
create table type_recrutement (
   code_rec             int                  not null,
   design_rec           nvarchar(50)         null,
   abrv_rec             nvarchar(50)         null,
   constraint PK_TYPE_RECRUTEMENT primary key (code_rec)
)
go

/*==============================================================*/
/* Table : type_sanction                                        */
/*==============================================================*/
create table type_sanction (
   code_ty_sanct        int                  not null,
   design_ty_sanct      nvarchar(50)         null,
   constraint PK_TYPE_SANCTION primary key (code_ty_sanct)
)
go

alter table Transfert_ext
   add constraint FK_TRANSFER_REFERENCE_LISTE_CO foreign key (code_corge)
      references liste_corge (code_corge)
go

alter table Transfert_ext
   add constraint FK_TRANSFER_Trans_Ext_PERSONNE foreign key (id)
      references personnel (id)
go

alter table Transfert_int
   add constraint FK_TRANSFER_Trans_Int_PERSONNE foreign key (per_id)
      references personnel (id)
go

alter table Transfert_int
   add constraint FK_TRANSFER_REFERENCE_LISTE_DE foreign key (code_depart)
      references liste_departement (code_depart)
go

alter table Transfert_int
   add constraint FK_TRANSFER_TransInt_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_blessure
   add constraint FK_HISTORIQ_bless_PERSONNE foreign key (per_id)
      references personnel (id)
go

alter table historique_blessure
   add constraint FK_HISTORIQ_REFERENCE_LISTE_AC foreign key (code_accident)
      references liste_accident (code_accident)
go

alter table historique_blessure
   add constraint FK_HISTORIQ_blessu_PERSONNE foreign key (per_id)
      references personnel (id)
go

alter table historique_carte_militaire
   add constraint FK_HISTORIQ_carteMili_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_conge
   add constraint FK_HISTORIQ_conge_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_conge
   add constraint FK_HISTORIQ_REFERENCE_LISTE_PA foreign key (code_pays)
      references liste_pays (code_pays)
go

alter table historique_conge
   add constraint FK_HISTORIQ_REFERENCE_LISTE_TY foreign key (code_ty_conge)
      references liste_type_conge (code_ty_conge)
go

alter table historique_contrat
   add constraint FK_HISTORIQ_REFERENCE_TYPE_CON foreign key (code_ty_contrat)
      references type_contrat (code_ty_contrat)
go

alter table historique_contrat
   add constraint FK_HISTORIQ_contrat_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_fonction
   add constraint FK_HISTORIQ_REFERENCE_LISTE_FO foreign key (code_fonct)
      references liste_fonction (code_fonct)
go

alter table historique_fonction
   add constraint FK_personnel_historique_fonction_id_personnel foreign key (per_id)
      references personnel (id)
         on update cascade on delete cascade
go

alter table historique_grade
   add constraint FK_HISTORIQ_grade_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_grade
   add constraint FK_HISTORIQ_REFERENCE_LISTE_GR foreign key (code_grade)
      references liste_grade (code_grade)
go

alter table historique_passport
   add constraint FK_HISTORIQ_REFERENCE_TYPE_PAS foreign key (code_typPass)
      references type_passeport (code_typPass)
go

alter table historique_passport
   add constraint FK_HISTORIQ_passport_PERSONNE foreign key (per_id)
      references personnel (id)
go

alter table historique_sanction
   add constraint FK_HISTORIQ_REFERENCE_TYPE_SAN foreign key (code_ty_sanct)
      references type_sanction (code_ty_sanct)
go

alter table historique_sanction
   add constraint FK_HISTORIQ_sanction_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_situation
   add constraint FK_HISTORIQ_situation_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_situation
   add constraint FK_HISTORIQ_REFERENCE_SITUATIO foreign key (code_situ2)
      references situation_s2 (code_situ2)
go

alter table historique_validite_service
   add constraint FK_HISTORIQ_valid_serv_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historique_validite_service
   add constraint FK_HISTORIQ_valid_serv_LISTE_TY foreign key (code_ty_val_ser)
      references liste_ty_val_ser (code_ty_val_ser)
go

alter table historiques_diplomes
   add constraint FK_HISTORIQ_diplo_PERSONNE1 foreign key (per_id)
      references personnel (id)
go

alter table historiques_diplomes
   add constraint FK_HISTORIQ_REFERENCE_LISTE_DI foreign key (code_diplome)
      references liste_diplome (code_diplome)
go

alter table historiques_diplomes
   add constraint FK_HISTORIQ_REFERENCE_LISTE_EC foreign key (code_ecole)
      references liste_ecole (code_ecole)
go

alter table historiques_interruptions
   add constraint FK_HISTORIQ_interrup_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historiques_interruptions
   add constraint FK_HISTORIQ_REFERENCE_LISTE_IN foreign key (code_interr)
      references liste_interruption (code_interr)
go

alter table historiques_medailles_certificats
   add constraint FK_HISTORIQ_medail_certif_PERSONNE foreign key (id)
      references personnel (id)
go

alter table historiques_medailles_certificats
   add constraint FK_HISTORIQ_REFERENCE_LISTE_ME foreign key (code_medail_certif)
      references liste_medailles_certificats (code_medail_certif)
go

alter table historiques_promotion
   add constraint FK_HISTORIQ_promotion_PERSONNE foreign key (id)
      references personnel (id)
go

alter table liste_corge
   add constraint FK_LISTE_CO_REFERENCE_LISTE_BR foreign key (code_brigade)
      references liste_brigade (code_brigade)
go

alter table liste_corge
   add constraint FK_LISTE_CO_REFERENCE_LISTE_GA foreign key (code_garnison)
      references liste_garnison (code_garnison)
go

alter table liste_corge
   add constraint FK_LISTE_CO_REFERENCE_LISTE_RE foreign key (code_region)
      references liste_region (code_region)
go

alter table liste_corge
   add constraint FK_LISTE_CO_REFERENCE_LISTE_AR foreign key (code_arm)
      references liste_armee (code_arm)
go

alter table liste_delegation
   add constraint FK_LISTE_DE_REFERENCE_LISTE_GO foreign key (code_gouver)
      references liste_gouvernement (code_gouver)
go

alter table liste_departement
   add constraint FK_LISTE_DE_REFERENCE_LISTE_DI foreign key (code_div)
      references liste_division (code_div)
go

alter table liste_division
   add constraint FK_LISTE_DI_REFERENCE_LISTE_CO foreign key (code_corge)
      references liste_corge (code_corge)
go

alter table liste_ecole
   add constraint FK_LISTE_EC_REFERENCE_LISTE_PA foreign key (code_pays)
      references liste_pays (code_pays)
go

alter table note_annuelle
   add constraint FK_NOTE_ANN_REFERENCE_PERSONNE foreign key (id)
      references personnel (id)
go

alter table note_nuit
   add constraint FK_NOTE_NUI_REFERENCE_PERSONNE foreign key (id)
      references personnel (id)
go

alter table note_rendement
   add constraint FK_NOTE_REN_REFERENCE_PERSONNE foreign key (id)
      references personnel (id)
go

alter table personnel
   add constraint FK_PERSONNE_REFERENCE_LISTE_DE foreign key (code_deleg)
      references liste_delegation (code_deleg)
go

alter table personnel
   add constraint FK_PERSONNE_REFERENCE_LISTE_OR foreign key (code_orig_rec)
      references liste_origine_recrutement (code_orig_rec)
go

alter table personnel
   add constraint FK_PERSONNE_REFERENCE_TYPE_REC foreign key (code_rec)
      references type_recrutement (code_rec)
go

alter table personnel
   add constraint FK_PERSONNE_REFERENCE_GROUPE_S foreign key (code_grou_sang)
      references groupe_sanguin (code_grou_sang)
go

alter table personnel
   add constraint FK_PERSONNE_REFERENCE_LISTE_NI foreign key (code_niv_sco)
      references liste_niveauScolaire (code_niv_sco)
go

alter table situation_s1
   add constraint FK_SITUATIO_s_s1_SITUATIO foreign key (code_situ)
      references situation (code_situ)
go

alter table situation_s2
   add constraint "FK_SITUATIO_1-2_SITUATIO" foreign key (code_situ1)
      references situation_s1 (code_situ1)
go


create trigger "CLR Trigger_historique_fonction" on historique_fonction  insert as
external name %Assembly.GeneratedName%.
go


create trigger "CLR Trigger_personnel" on personnel  insert as
external name %Assembly.GeneratedName%.
go

