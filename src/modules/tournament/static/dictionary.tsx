import type { Lang } from "@/interfaces";
import { Users, Wallet, Globe, Trophy } from "lucide-react";
import type { ReactNode } from "react";

interface TournamentDictionary<T> {
  title: string;
  description: string;
  announcement: string;
  contents: Record<string, T>;
}

export interface ParticipateTournamentDictionary
  extends TournamentDictionary<string> {
  remember: string;
  rememberMessage: string;
}

export interface CreateTournamentDictionary
  extends TournamentDictionary<string> {
  important: string;
  alertMessage: string;
}

export interface ExplainTournamentDictionary
  extends TournamentDictionary<{ content: string; icon: ReactNode }> {
  navigate: string;
  toCreate: string;
  toJoin: string;
  benefits: {
    title: string;
    contents: string[];
  };
}

const participateDictionary: Record<Lang, ParticipateTournamentDictionary> = {
  id: {
    title: "Mengikuti Turnamen",
    description: "Ikuti langkah-langkah ini untuk mengikuti turnamen",
    announcement:
      "Bagi pengguna yang ingin berpartisipasi dalam turnamen, langkah-langkah berikut harus dilakukan",
    contents: {
      "Membuat Tim:":
        "Pengguna harus membuat tim terlebih dahulu jika belum memiliki tim. Hanya tim yang bisa mendaftar ke turnamen.",
      "Mendaftar ke Turnamen:":
        "Pemilik tim bertanggung jawab untuk mendaftarkan tim ke turnamen dengan membayar biaya pendaftaran melalui wallet atau transfer bank.",
      "Hanya Pemilik Tim":
        "Hanya pemilik tim yang berhak mendaftarkan tim ke turnamen. Anggota tim lainnya tidak dapat mendaftar atas nama tim.",
    },
    remember: "Ingat!",
    rememberMessage:
      "Pastikan Anda telah membuat tim sebelum mencoba bergabung dengan turnamen. Jika Anda bukan pemilik tim, koordinasikan dengan pemilik tim Anda untuk mendaftar turnamen.",
  },
  en: {
    title: "Joining a Tournament",
    description: "Follow these steps to participate in an exciting tournament",
    announcement:
      "For users who want to participate in a tournament, the following steps must be taken:",
    contents: {
      "Create a Team:":
        "You must first create a team if you haven't already. Only teams are allowed to join tournaments.",
      "Register for the Tournament:":
        "The team owner is responsible for registering the team for the tournament. They can do this by paying the registration fee  using either a wallet or bank transfer.",
      "Team Owner Only:":
        "Only the owner of the team has the authority to register the team for the tournament. Other team members cannot register on  behalf of the team.",
    },
    remember: "Remember!",
    rememberMessage:
      "Make sure you have created a team before attempting to join a  tournament. If you're not a team owner, coordinate with your team  owner to register for the tournament.",
  },
};

const createTeamDictionary: Record<Lang, CreateTournamentDictionary> = {
  id: {
    title: "Membuat Turnamen",
    description: "Ikuti langkah-langkah ini untuk menyiapkan turnamen Anda",
    announcement:
      "Untuk membuat turnamen, pengguna harus melengkapi formulir dengan informasi berikut:",
    contents: {
      "Nama Turnamen": "Nama turnamen yang ingin dibuat.",
      "ID Game": "ID game yang akan dipertandingkan dalam turnamen.",
      "Prize Pool": "Total hadiah yang akan diberikan dalam turnamen.",
      "Jumlah Slot": "Jumlah tim atau peserta yang bisa ikut turnamen.",
      "Tanggal Mulai": "Tanggal dimulainya turnamen.",
      "Biaya Pendaftaran":
        "Biaya yang harus dibayar oleh setiap tim untuk mendaftar ke turnamen.",
      "Deskripsi (opsional)":
        "Keterangan tambahan tentang turnamen (jika diperlukan).",
      Lokasi: "Lokasi turnamen (bisa online atau offline).",
      Tag: "Kata kunci atau kategori yang terkait dengan turnamen.",
      "ID Komunitas (opsional)":
        "ID komunitas yang mengorganisir turnamen (jika ada).",
      "Publik/Privat":
        "Tentukan apakah turnamen terbuka untuk umum atau hanya untuk peserta tertentu.",
      "Tipe Pembayaran":
        "Pilih apakah hadiah (prize pool) akan didanai melalui wallet atau transfer.",
      "Metode Pembayaran":
        "Pilih penyedia layanan pembayaran yang tersedia (jika diperlukan).",
    },
    important: "Penting!",
    alertMessage:
      "Jika prize pool tidak diisi atau tidak didanai langsung oleh penyelenggara, maka dana hadiah akan diambil dari biaya pendaftaran tim-tim yang mendaftar. Jika dana yang terkumpul dari pendaftaran tidak mencukupi, turnamen akan dibatalkan secara otomatis.",
  },
  en: {
    title: "Creating a Tournament",
    description: "Follow these steps to set up your tournament",
    announcement:
      "To create a tournament, users need to complete a form with the following information:",
    contents: {
      "Tournament Name": "The name of the tournament.",
      "Game ID":
        "The ID of the game for which the tournament is being created.",
      "Prize Pool": "The total prize money for the tournament.",
      "Number of Slots":
        "The number of teams or participants allowed in the tournament.",
      "Start Date": "The date when the tournament begins.",
      "Registration Fee": "The fee each team must pay to join the tournament.",
      "Description (optional)":
        "Additional details about the tournament (optional).",
      Location:
        "Where the tournament will take place (can be an online or physical location).",
      Tags: "Keywords or categories related to the tournament.",
      "Community ID (optional)":
        "The ID of the community organizing the tournament (if applicable).",
      "Public/Private Tournament":
        "Choose whether the tournament will be open to everyone or restricted to certain participants.",
      "Payment Type":
        "Select whether the prize pool will be funded through wallet payments or bank transfers.",
      "Payment Method":
        "Select the payment provider for transactions (if applicable).",
    },
    important: "Important!",
    alertMessage:
      "If the prize pool is not funded directly by the organizer, it will be sourced from the registration fees of the teams that sign up. If the total registration fees collected are insufficient to meet the prize pool, the tournament will be automatically canceled.",
  },
};

const explainTourDictionary: Record<Lang, ExplainTournamentDictionary> = {
  en: {
    title: "Tournament Feature",
    description: "Compete, Organize, and Win!",
    announcement:
      "Our platform offers a tournament feature that allows you to either create or join thrilling competitions across various  games. The tournaments are designed to provide a fair and  competitive experience where you and your team can compete for  victory and prizes.",
    contents: {
      "Create Your Own Tournament": {
        content:
          "Become a tournament organizer and invite teams to compete.  Customize the format, prize pool, and rules to suit your  needs.",
        icon: <Trophy className="w-6 h-6 mr-2" />,
      },
      "Join Existing Tournaments": {
        content:
          "Participate in tournaments that are already set up and test  your team's skills against tough opponents.",
        icon: <Users className="w-6 h-6 mr-2" />,
      },
      "Flexible Payment Options": {
        content:
          "Whether you're organizing or joining a tournament, you can pay using various methods, including bank transfers and digital  wallets.",
        icon: <Wallet className="w-6 h-6 mr-2" />,
      },
      "Gaming Community Support": {
        content:
          "We support gaming communities, and some tournaments can be  tailored to the needs of specific communities.",
        icon: <Globe className="w-6 h-6 mr-2" />,
      },
    },
    navigate: "How to Use the Tournament Feature?",
    toCreate: "How to Create a Tournament",
    toJoin: "How to Join a Tournament",
    benefits: {
      title: "Additional Tournament Benefits",
      contents: [
        "Gain exposure and recognition in the gaming community",
        "Improve your skills by competing against top players",
        "Win prizes and potentially earn from your gaming passion",
        "Build and strengthen your team dynamics",
        "Network with other players and teams in your game's ecosystem",
      ],
    },
  },
  id: {
    title: "Fitur Turnamen",
    description: "Bersaing, Berorganisasi, dan Menang!",
    announcement:
      "Platform kami menawarkan fitur turnamen, di mana kamu bisa membuat atau mengikuti kompetisi seru dalam berbagai game. Turnamen ini dirancang untuk memberikan pengalaman kompetisi yang adil dan menegangkan, di mana kamu dan timmu bisa bersaing untuk meraih kemenangan dan hadiah.",
    contents: {
      "Buat Turnamen Sendiri": {
        content:
          "Jadilah penyelenggara turnamen dan undang tim-tim lain untuk ikut bersaing. Sesuaikan format, hadiah, dan aturan turnamen sesuai dengan kebutuhanmu.",
        icon: <Trophy className="w-6 h-6 mr-2" />,
      },
      "Ikut dalam Turnamen": {
        content:
          "Bergabunglah dengan turnamen yang sudah ada dan uji kemampuan timmu melawan lawan-lawan tangguh.",
        icon: <Users className="w-6 h-6 mr-2" />,
      },
      "Opsi Pembayaran yang Fleksibel": {
        content:
          "Baik untuk penyelenggara maupun peserta, kamu bisa menggunakan berbagai metode pembayaran, termasuk transfer bank dan dompet digital.",
        icon: <Wallet className="w-6 h-6 mr-2" />,
      },
      "Dukungan Komunitas Gaming": {
        content:
          "Kami mendukung komunitas-komunitas gaming, dan beberapa turnamen bisa disesuaikan dengan kebutuhan komunitasmu.",
        icon: <Globe className="w-6 h-6 mr-2" />,
      },
    },
    navigate: "Bagaimana cara menggunakan fitur turnamen?",
    toCreate: "Bagaimana cara membuat sebuah turnamen",
    toJoin: "Bagaimana cara bergabung dalam sebuah turnamen",
    benefits: {
      title: "Keuntungan lainnya",
      contents: [
        "Dapatkan eksposur dan pengakuan di komunitas game",
        "Tingkatkan keterampilan Anda dengan bersaing melawan pemain top",
        "Menangkan hadiah dan berpotensi dapatkan penghasilan dari hasrat bermain game Anda",
        "Bangun dan perkuat dinamika tim Anda",
        "Bangun jaringan dengan pemain dan tim lain di ekosistem game Anda",
      ],
    },
  },
};

export const getParticipateDictionaryDictionary = (lang: Lang) =>
  participateDictionary[lang] ?? participateDictionary.en;

export const getCreateTeamDictionary = (lang: Lang) =>
  createTeamDictionary[lang] ?? createTeamDictionary.en;

export const getExplainTourDictionary = (lang: Lang) =>
  explainTourDictionary[lang] ?? explainTourDictionary.en;
