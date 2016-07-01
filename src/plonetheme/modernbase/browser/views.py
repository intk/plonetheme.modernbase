from Acquisition import aq_inner
from Products.Five import BrowserView


class OnlineExperienceView(BrowserView):

	def getSlideshowItems(self):
		context = self.context
		inc = 2
		nthchild = 1

		inline_css = ""
		template = ".cd-fixed-bg:nth-child(%s) { background-image: url('%s');}"

		if 'slideshow' in context:
			slideshow = context['slideshow']
			for _id in slideshow:
				obj = slideshow[_id]
				if obj:
					portal_type = getattr(obj, 'portal_type', None)
					if portal_type == "Image":
							url = obj.absolute_url()+"/@@images/image/large"
							new_image = template % (nthchild, url)
							inline_css += new_image
							nthchild += inc

		final_inline_css = "<style>" + inline_css + "</style>"
		return final_inline_css

