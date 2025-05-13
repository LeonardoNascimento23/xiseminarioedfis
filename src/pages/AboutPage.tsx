import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from '../components/ui/Card';
import { ExternalLink } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  link?: string;
}

interface TeamSection {
  title: string;
  leader: TeamMember;
  members: TeamMember[];
}

const teamData: TeamSection[] = [
  {
    title: "Coordenação Geral",
    leader: {
      name: "Pâmela Talita Valdez de Lima",
      role: "Coordenadora Geral",
      image: "/images/PamelaTalitaValdezdelima.jpeg"
    },
    members: []
  },
  {
    title: "Equipe de Comunicação",
    leader: {
      name: "Jhenyffer Freire de Oliveira",
      role: "Líder de Comunicação",
      image: "/images/JhenyfferFreiredeOliveira.jpeg"
    },
    members: [
      {
        name: "Leonardo Nascimento",
        role: "Programador",
        image: "/images/LeonardoNascimento.png",
        link: "https://linktr.ee/Leonardo.Vital?utm_source=linktree_profile_share&ltsid=d3dbe6d3-c1e1-4524-afb5-c33760549f03"
      },
      { name: "Rhaira", role: "Membro" },
      { name: "Maicon", role: "Membro" }
    ]
  },
  {
    title: "Equipe de Inscrições",
    leader: {
      name: "Mariana Zucão Barbosa Espindola",
      role: "Líder das Inscrições",
      image: "/images/MarianaZucaoBarbosaEspindola.jpeg"
    },
    members: [
      { name: "João Buttini", role: "Membro" },
      { name: "Brenda Dantas", role: "Membro" },
      { name: "Carolaine", role: "Membro" }
    ]
  },
  {
    title: "Equipe de Certificação",
    leader: {
      name: "Emily Alves da Silva",
      role: "Líder de Certificação",
      image: "/images/EmilyAlvesdaSilva.jpeg"
    },
    members: [
      { name: "Pâmela", role: "Membro" },
      { name: "Diogo", role: "Membro" }
    ]
  },
  {
    title: "Equipe de Oficinas",
    leader: {
      name: "Eduardo Nardi Chirata",
      role: "Líder da organização de Oficinas",
      image: "/images/EduardoNardiChirata.jpeg"
    },
    members: [
      { name: "Leonardo", role: "Membro" },
      { name: "Keije", role: "Membro" },
      { name: "Mariana Zucão", role: "Membro" },
      { name: "Esley", role: "Membro" },
      { name: "Danilo", role: "Membro" },
      { name: "Nathaly", role: "Membro" },
      { name: "Erick", role: "Membro" },
      { name: "Brenda", role: "Membro" },
      { name: "João Buttini", role: "Membro" }
    ]
  },
  {
    title: "Equipe de Cerimônias",
    leader: {
      name: "Professora Jacqueline",
      role: "Líder da organização de Cerimônias"
    },
    members: [
      { name: "Douglas", role: "Membro" },
      { name: "Vilmar", role: "Membro" },
      { name: "José Vinícius", role: "Membro" },
      { name: "Danielli", role: "Membro" }
    ]
  }
];

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('title, content')
          .eq('slug', 'about')
          .eq('published', true)
          .single();

        if (error) throw error;
        setContent(data);
      } catch (error) {
        console.error('Error fetching about page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {content?.title || 'Sobre o Seminário'}
          </h1>
          <p className="text-yellow-100 text-lg max-w-3xl mx-auto">
            Conheça mais sobre nossa missão, valores e história
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {content && (
          <div className="prose prose-lg prose-primary max-w-none mb-16">
            <ReactMarkdown>{content.content}</ReactMarkdown>
          </div>
        )}

        <div className="space-y-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossa Equipe
          </h2>

          {teamData.map((section, index) => (
            <div key={index} className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                {section.title}
              </h3>

              {/* Líder */}
              <div className="mb-8">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-primary/20">
                  <div className="flex flex-col md:flex-row items-center p-6">
                    {section.leader.image && (
                      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0 md:mr-6">
                        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/20">
                          <img
                            src={section.leader.image}
                            alt={section.leader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-center md:text-left">
                      <h4 className="font-bold text-xl text-gray-900 mb-2">
                        {section.leader.name}
                      </h4>
                      <p className="text-primary font-medium">{section.leader.role}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Membros */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.members.map((member, memberIndex) => (
                  <Card key={memberIndex} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    {member.image && (
                      <div className="relative h-48 w-full flex-shrink-0">
                        {member.name === "Leonardo Nascimento" ? (
                          <div className="flex justify-center items-center h-full">
                            <div className="relative w-40 h-40">
                              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/20">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                    <CardContent className="p-4 flex-grow flex items-center">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        {member.link && (
                          <a
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/90"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;