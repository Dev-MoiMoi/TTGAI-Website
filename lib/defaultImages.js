/**
 * Bundled default images for each site_images slot.
 *
 * Public pages fall back to these when a slot's image_url is empty; the admin
 * Site Images tab uses this same map to preview what the site currently shows
 * before an admin uploads a replacement. Keep in sync with the pages.
 */
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import aboutBg from '../assets/About bg.jpg';
import missionImg from '../assets/mission.jpg';
import advocacyImg from '../assets/advocacy.jpg';
import valueImg from '../assets/value.jpg';
import visionImg from '../assets/vision.jpg';
import earthDay1 from '../assets/Earth Day/684180445_946665661451288_8343696422311329551_n.jpg';
import earthDay2 from '../assets/Earth Day/679722873_946663178118203_8060107513597089396_n.jpg';
import earthDay3 from '../assets/Earth Day/684563813_946667001451154_2670219676718142406_n.jpg';
import earthDay4 from '../assets/Earth Day/683586609_946666171451237_1391433544689973347_n.jpg';
import earthDay5 from '../assets/Earth Day/682565609_946666071451247_6417247281028576333_n.jpg';
import earthDay6 from '../assets/Earth Day/684180445_946663738118147_77551954255807091_n.jpg';
import ethics1 from '../assets/Ethics Seminar/679770527_1629939499136462_8784497964349652169_n.jpg';
import ethics2 from '../assets/Ethics Seminar/680216454_1629939552469790_6476341565189612828_n.jpg';
import ethics3 from '../assets/Ethics Seminar/679618311_1629939532469792_2245372649445564062_n.jpg';
import photoJonMateo from '../assets/Trustees/Jon Mateo.jpg';
import photoJuliusBuenaventura from '../assets/Trustees/Julius Buenaventura.jpg';
import photoReneDelaCruz from '../assets/Trustees/Rene Delacruz.jpg';
import scholarDanielBenegas from '../assets/Scholars/Daniel Matthew Benegas.jpg';
import pncLogo from '../assets/Linkages/PnC Logo.jpg';
import buscowitzLogo from '../assets/Linkages/Buskowitz.png';

const DEFAULT_SITE_IMAGES = {
  // Hero / Background
  navbar_logo: img5,
  home_hero: img4,
  home_spot_1: img1,
  home_spot_2: img2,
  home_spot_3: img3,
  about_hero: aboutBg,
  about_mission: missionImg,
  about_founding: advocacyImg,
  about_pki: valueImg,
  about_sinag: visionImg,
  sponsorship_hero: img4,
  team_placeholder: img5,

  // Events
  earth_day_1: earthDay1,
  earth_day_2: earthDay2,
  earth_day_3: earthDay3,
  earth_day_4: earthDay4,
  earth_day_5: earthDay5,
  earth_day_6: earthDay6,
  ethics_seminar_1: ethics1,
  ethics_seminar_2: ethics2,
  ethics_seminar_3: ethics3,

  // Team (only members with bundled photos; everything else uses the placeholder)
  team_placeholder: img5,
  team_tim_batac: img5,
  team_cesar_sangalang: img5,
  team_jon_mateo: photoJonMateo,
  team_rene_dela_cruz: photoReneDelaCruz,
  team_jun_valerio: img5,
  team_julius_buenaventura: photoJuliusBuenaventura,
  team_tony_mangubat: img5,
  team_malvin_castro: img5,
  team_carlos_lagdameo: img5,
  team_rey_araos: img5,
  team_daniel_matthew_benegas: scholarDanielBenegas,
  team_noel_cabangon: img1,
  team_dr_danilo_dan_c_lachica: img5,
  team_teotimo_tim_g_batac: img5,
  team_engr_domingo_dingo_bonifacio: img5,
  team_engr_antonio_tony_mangubat: img5,
  team_engr_rolando_rollie_lazaro: img5,
  team_primo_jon_mateo_jr: img5,

  // Partners
  linkages_pnc: pncLogo,
  linkages_buscowitz: buscowitzLogo,
  linkages_gmv: 'https://images.squarespace-cdn.com/content/v1/62eb33c6069f4814c6f2f5d2/7bf7e610-a89b-4b14-bd84-bb4f4e22c454/GMV+NEW+LOGO.png',
  linkages_fastech: 'https://www.fastechsynergy.com/static/392877dc29c603e438f3e5da63b04bf6/a82c6/fastech-logo.png',
  linkages_seipi: 'https://seipi.org.ph/wp-content/uploads/elementor/thumbs/SEIPI-LOGO-qrmf087iuvkqfehukvhwsz242l482k8oyn0gynkkkg.png',
};

// Every team_* slot without a dedicated photo falls back to the placeholder.
export function defaultSiteImage(slug) {
  if (DEFAULT_SITE_IMAGES[slug]) return DEFAULT_SITE_IMAGES[slug];
  if (typeof slug === 'string' && slug.startsWith('team_')) return img5;
  return '';
}
