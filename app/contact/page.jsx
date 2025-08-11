import ContactForm from '../../components/ContactForm'
import { 
  BuildingOffice2Icon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ClockIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Contact Bajrang Industries for industrial roller solutions, technical support, and custom manufacturing requirements.',
}

export default function ContactPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 hero-title">
              Get in Touch
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed hero-subtitle">
              Ready to discuss your industrial roller requirements? Our team is here to help you 
              find the perfect solution for your manufacturing needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-8">
                Send us your requirements
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 flex items-center">
                    <BuildingOffice2Icon className="w-6 h-6 mr-2 text-primary-600" />
                    Factory Address
                  </h3>
                  <p className="text-primary-600">
                    Plot No. 28, GIDC Industrial Estate<br />
                    Phase-1, Vatva<br />
                    Ahmedabad - 382445<br />
                    Gujarat, India
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 flex items-center">
                    <EnvelopeIcon className="w-6 h-6 mr-2 text-primary-600" />
                    Email
                  </h3>
                  <p className="text-primary-600">info@bajrangindustries.com</p>
                  <p className="text-primary-600">sales@bajrangindustries.com</p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 flex items-center">
                    <PhoneIcon className="w-6 h-6 mr-2 text-primary-600" />
                    Phone
                  </h3>
                  <p className="text-primary-600">+91-98250 00000</p>
                  <p className="text-primary-600">+91-79-2583 0000</p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 flex items-center">
                    <ClockIcon className="w-6 h-6 mr-2 text-primary-600" />
                    Business Hours
                  </h3>
                  <p className="text-primary-600">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed<br />
                    <em>Emergency support available</em>
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 flex items-center">
                    <TruckIcon className="w-6 h-6 mr-2 text-primary-600" />
                    Service Areas
                  </h3>
                  <p className="text-primary-600">
                    Gujarat, Maharashtra, Rajasthan<br />
                    Pan-India supply and support<br />
                    International exports available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              For urgent requirements or technical emergencies, call our direct line for immediate support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="tel:+919825000000" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call Now: +91-98250 00000
              </a>
              <a href="mailto:info@bajrangindustries.com" className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors duration-200">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                Email: info@bajrangindustries.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
